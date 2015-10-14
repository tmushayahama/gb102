<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbProjectMentorshipTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_project_mentorship', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'project_mentorship_mentorship_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('project_id', 'project_mentorship_project_id')->references('id')->on('gb_project')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_project_mentorship', function(Blueprint $table)
		{
			$table->dropForeign('project_mentorship_mentorship_id');
			$table->dropForeign('project_mentorship_project_id');
		});
	}

}
