<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_timeline', function(Blueprint $table)
		{
			$table->foreign('goal_id', 'goal_timeline_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('timeline_id', 'goal_timeline_timeline_id')->references('id')->on('gb_timeline')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_timeline', function(Blueprint $table)
		{
			$table->dropForeign('goal_timeline_goal_id');
			$table->dropForeign('goal_timeline_timeline_id');
		});
	}

}
