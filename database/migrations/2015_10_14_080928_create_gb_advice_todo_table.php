<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice_todo', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('todo_id')->index('advice_todo_todo_id');
			$table->integer('advice_id')->index('advice_todo_advice_id');
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
		Schema::drop('gb_advice_todo');
	}

}
