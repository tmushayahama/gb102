<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_todo', function(Blueprint $table)
		{
			$table->foreign('skill_id', 'skill_todo_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('todo_id', 'skill_todo_todo_id')->references('id')->on('gb_todo')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_todo', function(Blueprint $table)
		{
			$table->dropForeign('skill_todo_skill_id');
			$table->dropForeign('skill_todo_todo_id');
		});
	}

}
