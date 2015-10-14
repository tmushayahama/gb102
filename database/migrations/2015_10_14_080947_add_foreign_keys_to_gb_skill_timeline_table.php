<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_timeline', function(Blueprint $table)
		{
			$table->foreign('skill_id', 'skill_timeline_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('timeline_id', 'skill_timeline_timeline_id')->references('id')->on('gb_timeline')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_timeline', function(Blueprint $table)
		{
			$table->dropForeign('skill_timeline_skill_id');
			$table->dropForeign('skill_timeline_timeline_id');
		});
	}

}
