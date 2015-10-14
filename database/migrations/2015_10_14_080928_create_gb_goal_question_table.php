<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbGoalQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_goal_question', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('question_id')->index('goal_question_question_id');
			$table->integer('goal_id')->index('goal_question_goal_id');
			$table->integer('privacy')->default(0);
			$table->integer('status')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_goal_question');
	}

}
