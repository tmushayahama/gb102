<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbHobbyTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_hobby_todo', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('todo_id')->index('hobby_todo_todo_id');
			$table->integer('hobby_id')->index('hobby_todo_hobby_id');
			$table->integer('privacy')->default(0);
			$table->integer('status')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_hobby_todo');
	}

}
