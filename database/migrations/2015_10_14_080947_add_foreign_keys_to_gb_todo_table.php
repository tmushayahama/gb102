<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_todo', function(Blueprint $table)
		{
			$table->foreign('assignee_id', 'todo_assignee_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('creator_id', 'todo_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_todo_id', 'todo_parent_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('priority_id', 'todo_priority_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_todo', function(Blueprint $table)
		{
			$table->dropForeign('todo_assignee_id');
			$table->dropForeign('todo_creator_id');
			$table->dropForeign('todo_parent_todo_id');
			$table->dropForeign('todo_priority_id');
		});
	}

}
