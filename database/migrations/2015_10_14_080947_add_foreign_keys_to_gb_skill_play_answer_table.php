<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillPlayAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_play_answer', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'skill_play_answer_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'skill_play_answer_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_level_id', 'skill_play_answer_skill_level_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_modified_id', 'skill_play_answer_skill_modified_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_play_answer', function(Blueprint $table)
		{
			$table->dropForeign('skill_play_answer_creator_id');
			$table->dropForeign('skill_play_answer_skill_id');
			$table->dropForeign('skill_play_answer_skill_level_id');
			$table->dropForeign('skill_play_answer_skill_modified_id');
		});
	}

}
