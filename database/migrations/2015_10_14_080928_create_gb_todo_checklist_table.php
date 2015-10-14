<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbTodoChecklistTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_todo_checklist', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('checklist_id')->index('todo_checklist_checklist_id');
			$table->integer('todo_id')->index('todo_checklist_todo_id');
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
		Schema::drop('gb_todo_checklist');
	}

}
