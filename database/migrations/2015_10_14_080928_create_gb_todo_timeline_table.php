<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbTodoTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_todo_timeline', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('timeline_id')->index('todo_timeline_timeline_id');
			$table->integer('todo_id')->index('todo_timeline_todo_id');
			$table->integer('day');
			$table->integer('type')->default(0);
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
		Schema::drop('gb_todo_timeline');
	}

}
