<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_todo', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'mentorship_todo_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'mentorship_todo_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_todo', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_todo_mentorship_id');
			$table->dropForeign('mentorship_todo_todo_id');
		});
	}

}
