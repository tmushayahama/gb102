<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbGoalTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_goal', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_goal_id')->nullable()->index('goal_parent_goal_id');
			$table->integer('creator_id')->index('goal_creator_id');
			$table->integer('type_id')->nullable()->index('goal_type_id');
			$table->string('goal_picture_url', 250)->default('goal_default.png');
			$table->string('title', 100);
			$table->string('description', 500)->default('');
			$table->dateTime('created_date')->nullable();
			$table->integer('level_id')->index('goal_level_id');
			$table->integer('points')->default(0);
			$table->integer('privacy')->default(0);
			$table->integer('order')->default(1);
			$table->integer('status')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_goal');
	}

}
