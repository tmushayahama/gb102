<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_discussion', function(Blueprint $table)
		{
			$table->foreign('discussion_id', 'goal_discussion_discussion_id')->references('id')->on('gb_discussion')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('goal_id', 'goal_discussion_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_discussion', function(Blueprint $table)
		{
			$table->dropForeign('goal_discussion_discussion_id');
			$table->dropForeign('goal_discussion_goal_id');
		});
	}

}
