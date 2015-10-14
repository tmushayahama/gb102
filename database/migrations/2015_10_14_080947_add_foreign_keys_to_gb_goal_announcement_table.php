<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_announcement', function(Blueprint $table)
		{
			$table->foreign('announcement_id', 'goal_announcement_announcement_id')->references('id')->on('gb_announcement')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('goal_id', 'goal_announcement_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_announcement', function(Blueprint $table)
		{
			$table->dropForeign('goal_announcement_announcement_id');
			$table->dropForeign('goal_announcement_goal_id');
		});
	}

}
