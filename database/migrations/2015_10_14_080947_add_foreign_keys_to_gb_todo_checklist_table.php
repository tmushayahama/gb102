<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTodoChecklistTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_todo_checklist', function(Blueprint $table)
		{
			$table->foreign('checklist_id', 'todo_checklist_checklist_id')->references('id')->on('gb_checklist')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'todo_checklist_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_todo_checklist', function(Blueprint $table)
		{
			$table->dropForeign('todo_checklist_checklist_id');
			$table->dropForeign('todo_checklist_todo_id');
		});
	}

}
