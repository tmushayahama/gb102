<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_weblink', function(Blueprint $table)
		{
			$table->foreign('goal_id', 'goal_weblink_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('weblink_id', 'goal_weblink_weblink_id')->references('id')->on('gb_weblink')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_weblink', function(Blueprint $table)
		{
			$table->dropForeign('goal_weblink_goal_id');
			$table->dropForeign('goal_weblink_weblink_id');
		});
	}

}
