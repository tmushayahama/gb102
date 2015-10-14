<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbGoalDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_goal_discussion', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('discussion_id')->index('goal_discussion_discussion_id');
			$table->integer('goal_id')->index('goal_discussion_goal_id');
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
		Schema::drop('gb_goal_discussion');
	}

}
