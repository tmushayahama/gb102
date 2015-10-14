<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_note', function(Blueprint $table)
		{
			$table->foreign('goal_id', 'goal_note_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('note_id', 'goal_note_note_id')->references('id')->on('gb_note')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_note', function(Blueprint $table)
		{
			$table->dropForeign('goal_note_goal_id');
			$table->dropForeign('goal_note_note_id');
		});
	}

}
