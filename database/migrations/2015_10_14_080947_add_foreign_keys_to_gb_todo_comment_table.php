<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTodoCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_todo_comment', function(Blueprint $table)
		{
			$table->foreign('comment_id', 'todo_comment_comment_id')->references('id')->on('gb_comment')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'todo_comment_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_todo_comment', function(Blueprint $table)
		{
			$table->dropForeign('todo_comment_comment_id');
			$table->dropForeign('todo_comment_todo_id');
		});
	}

}
