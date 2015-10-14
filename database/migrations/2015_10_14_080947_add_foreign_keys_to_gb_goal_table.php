<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'goal_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('level_id', 'goal_level_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_goal_id', 'goal_parent_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'goal_type_id')->references('id')->on('gb_goal_type')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal', function(Blueprint $table)
		{
			$table->dropForeign('goal_creator_id');
			$table->dropForeign('goal_level_id');
			$table->dropForeign('goal_parent_goal_id');
			$table->dropForeign('goal_type_id');
		});
	}

}
