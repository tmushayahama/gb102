<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillProgressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_progress', function(Blueprint $table)
		{
			$table->foreign('skill_id', 'skill_progress_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('progress_id', 'skill_progress_progress_id')->references('id')->on('gb_progress')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_progress', function(Blueprint $table)
		{
			$table->dropForeign('skill_progress_skill_id');
			$table->dropForeign('skill_progress_progress_id');
		});
	}

}
