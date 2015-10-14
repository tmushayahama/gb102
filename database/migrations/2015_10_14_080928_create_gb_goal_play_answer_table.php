<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbGoalPlayAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_goal_play_answer', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('goal_id')->index('goal_play_answer_goal_id');
			$table->integer('creator_id')->index('goal_play_creator_id');
			$table->integer('goal_modified_id')->nullable()->index('goal_play_answer_goal_modified_id');
			$table->integer('goal_play_answer');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
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
		Schema::drop('gb_goal_play_answer');
	}

}
