<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_todo', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_todo_id')->nullable()->index('todo_parent_todo_id');
			$table->integer('priority_id')->nullable()->index('todo_priority_id');
			$table->integer('creator_id')->index('todo_creator_id');
			$table->integer('assignee_id')->nullable()->index('todo_assignee_id');
			$table->dateTime('created_date');
			$table->dateTime('due_date')->nullable();
			$table->string('todo_color', 6)->default('FFFFFF');
			$table->string('description', 500)->default('');
			$table->integer('type')->default(0);
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
		Schema::drop('gb_todo');
	}

}
