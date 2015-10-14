<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_question', function(Blueprint $table)
		{
			$table->foreign('goal_id', 'goal_question_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('question_id', 'goal_question_question_id')->references('id')->on('gb_question')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_question', function(Blueprint $table)
		{
			$table->dropForeign('goal_question_goal_id');
			$table->dropForeign('goal_question_question_id');
		});
	}

}
