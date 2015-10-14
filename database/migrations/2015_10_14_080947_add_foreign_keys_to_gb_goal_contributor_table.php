<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_contributor', function(Blueprint $table)
		{
			$table->foreign('contributor_id', 'goal_contributor_contributor_id')->references('id')->on('gb_contributor')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('goal_id', 'goal_contributor_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_contributor', function(Blueprint $table)
		{
			$table->dropForeign('goal_contributor_contributor_id');
			$table->dropForeign('goal_contributor_goal_id');
		});
	}

}
