<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_tag', function(Blueprint $table)
		{
			$table->foreign('goal_id', 'goal_tag_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tag_id', 'goal_tag_tag_id')->references('id')->on('gb_tag')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tagger_id', 'goal_tag_tagger_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_tag', function(Blueprint $table)
		{
			$table->dropForeign('goal_tag_goal_id');
			$table->dropForeign('goal_tag_tag_id');
			$table->dropForeign('goal_tag_tagger_id');
		});
	}

}
