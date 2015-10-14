<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_comment', function(Blueprint $table)
		{
			$table->foreign('comment_id', 'goal_comment_comment_id')->references('id')->on('gb_comment')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('goal_id', 'goal_comment_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_comment', function(Blueprint $table)
		{
			$table->dropForeign('goal_comment_comment_id');
			$table->dropForeign('goal_comment_goal_id');
		});
	}

}
