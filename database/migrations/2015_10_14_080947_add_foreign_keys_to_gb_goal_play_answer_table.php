<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalPlayAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_play_answer', function(Blueprint $table)
		{
			$table->foreign('goal_id', 'goal_play_answer_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('goal_modified_id', 'goal_play_answer_goal_modified_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('creator_id', 'goal_play_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_play_answer', function(Blueprint $table)
		{
			$table->dropForeign('goal_play_answer_goal_id');
			$table->dropForeign('goal_play_answer_goal_modified_id');
			$table->dropForeign('goal_play_creator_id');
		});
	}

}
