<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbSkillTodoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_skill_todo', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('todo_id')->index('skill_todo_todo_id');
			$table->integer('skill_id')->index('skill_todo_skill_id');
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
		Schema::drop('gb_skill_todo');
	}

}
