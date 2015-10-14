<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbProjectMentorshipTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_project_mentorship', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('mentorship_id')->index('project_mentorship_mentorship_id');
			$table->integer('project_id')->index('project_mentorship_project_id');
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
		Schema::drop('gb_project_mentorship');
	}

}
