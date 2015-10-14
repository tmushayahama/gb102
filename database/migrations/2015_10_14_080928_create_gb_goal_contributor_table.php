<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbGoalContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_goal_contributor', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('contributor_id')->index('goal_contributor_contributor_id');
			$table->integer('goal_id')->index('goal_contributor_goal_id');
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
		Schema::drop('gb_goal_contributor');
	}

}
