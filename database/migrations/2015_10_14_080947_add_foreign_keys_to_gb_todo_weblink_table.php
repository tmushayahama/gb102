<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTodoWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_todo_weblink', function(Blueprint $table)
		{
			$table->foreign('todo_id', 'todo_weblink_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('weblink_id', 'todo_weblink_weblink_id')->references('id')->on('gb_weblink')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_todo_weblink', function(Blueprint $table)
		{
			$table->dropForeign('todo_weblink_todo_id');
			$table->dropForeign('todo_weblink_weblink_id');
		});
	}

}
