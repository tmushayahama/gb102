<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipSkillTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_skill', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'mentorship_skill_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentorship_id', 'mentorship_skill_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'mentorship_skill_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_skill', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_skill_creator_id');
			$table->dropForeign('mentorship_skill_mentorship_id');
			$table->dropForeign('mentorship_skill_skill_id');
		});
	}

}
