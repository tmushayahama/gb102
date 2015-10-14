<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_discussion', function(Blueprint $table)
		{
			$table->foreign('discussion_id', 'skill_discussion_discussion_id')->references('id')->on('gb_discussion')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'skill_discussion_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_discussion', function(Blueprint $table)
		{
			$table->dropForeign('skill_discussion_discussion_id');
			$table->dropForeign('skill_discussion_skill_id');
		});
	}

}
