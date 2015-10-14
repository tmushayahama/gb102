<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTodoNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_todo_note', function(Blueprint $table)
		{
			$table->foreign('note_id', 'todo_note_note_id')->references('id')->on('gb_note')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'todo_note_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_todo_note', function(Blueprint $table)
		{
			$table->dropForeign('todo_note_note_id');
			$table->dropForeign('todo_note_todo_id');
		});
	}

}
