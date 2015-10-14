<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_todo', function(Blueprint $table)
		{
			$table->foreign('goal_id', 'goal_todo_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'goal_todo_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_todo', function(Blueprint $table)
		{
			$table->dropForeign('goal_todo_goal_id');
			$table->dropForeign('goal_todo_todo_id');
		});
	}

}
