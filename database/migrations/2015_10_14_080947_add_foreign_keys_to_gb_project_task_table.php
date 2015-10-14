<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbProjectTaskTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_project_task', function(Blueprint $table)
		{
			$table->foreign('project_id', 'project_task_project_id')->references('id')->on('gb_project')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('task_id', 'project_task_task_id')->references('id')->on('gb_task')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_project_task', function(Blueprint $table)
		{
			$table->dropForeign('project_task_project_id');
			$table->dropForeign('project_task_task_id');
		});
	}

}
