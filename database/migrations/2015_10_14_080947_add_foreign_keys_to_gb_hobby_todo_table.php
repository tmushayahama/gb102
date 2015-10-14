<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_todo', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_todo_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'hobby_todo_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_todo', function(Blueprint $table)
		{
			$table->dropForeign('hobby_todo_hobby_id');
			$table->dropForeign('hobby_todo_todo_id');
		});
	}

}
