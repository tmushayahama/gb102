<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTodoTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_todo_timeline', function(Blueprint $table)
		{
			$table->foreign('timeline_id', 'todo_timeline_timeline_id')->references('id')->on('gb_timeline')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'todo_timeline_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_todo_timeline', function(Blueprint $table)
		{
			$table->dropForeign('todo_timeline_timeline_id');
			$table->dropForeign('todo_timeline_todo_id');
		});
	}

}
