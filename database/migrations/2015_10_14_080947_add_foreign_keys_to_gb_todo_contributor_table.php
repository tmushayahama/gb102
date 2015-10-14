<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTodoContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_todo_contributor', function(Blueprint $table)
		{
			$table->foreign('contributor_id', 'todo_contributor_contributor_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'todo_contributor_todo_id')->references('id')->on('gb_todo_')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_todo_contributor', function(Blueprint $table)
		{
			$table->dropForeign('todo_contributor_contributor_id');
			$table->dropForeign('todo_contributor_todo_id');
		});
	}

}
