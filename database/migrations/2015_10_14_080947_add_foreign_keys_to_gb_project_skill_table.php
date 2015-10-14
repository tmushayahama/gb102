<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbProjectSkillTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_project_skill', function(Blueprint $table)
		{
			$table->foreign('project_id', 'project_skill_project_id')->references('id')->on('gb_project')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'project_skill_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_project_skill', function(Blueprint $table)
		{
			$table->dropForeign('project_skill_project_id');
			$table->dropForeign('project_skill_skill_id');
		});
	}

}
