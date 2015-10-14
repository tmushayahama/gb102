<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbTodoContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_todo_contributor', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('contributor_id')->index('todo_contributor_contributor_id');
			$table->integer('todo_id')->index('todo_contributor_todo_id');
			$table->integer('type_id')->default(1);
			$table->integer('status')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_todo_contributor');
	}

}
