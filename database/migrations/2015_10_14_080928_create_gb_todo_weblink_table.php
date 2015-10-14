<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbTodoWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_todo_weblink', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('weblink_id')->index('todo_weblink_weblink_id');
			$table->integer('todo_id')->index('todo_weblink_todo_id');
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
		Schema::drop('gb_todo_weblink');
	}

}
