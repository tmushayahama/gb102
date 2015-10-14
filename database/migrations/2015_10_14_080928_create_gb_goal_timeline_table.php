<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbGoalTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_goal_timeline', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('timeline_id')->index('goal_timeline_timeline_id');
			$table->integer('goal_id')->index('goal_timeline_goal_id');
			$table->integer('day');
			$table->integer('type')->default(0);
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
		Schema::drop('gb_goal_timeline');
	}

}
