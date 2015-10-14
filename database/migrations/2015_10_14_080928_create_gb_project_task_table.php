<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbProjectTaskTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_project_task', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('task_id')->index('project_task_task_id');
			$table->integer('project_id')->index('project_task_project_id');
			$table->integer('role');
			$table->string('description', 1000)->default('');
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
		Schema::drop('gb_project_task');
	}

}
