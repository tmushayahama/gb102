<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipGoalTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_goal', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'mentorship_goal_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('goal_id', 'mentorship_goal_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentorship_id', 'mentorship_goal_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_goal', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_goal_creator_id');
			$table->dropForeign('mentorship_goal_goal_id');
			$table->dropForeign('mentorship_goal_mentorship_id');
		});
	}

}
