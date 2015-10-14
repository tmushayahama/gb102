<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_question', function(Blueprint $table)
		{
			$table->foreign('question_id', 'skill_question_question_id')->references('id')->on('gb_question')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'skill_question_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_question', function(Blueprint $table)
		{
			$table->dropForeign('skill_question_question_id');
			$table->dropForeign('skill_question_skill_id');
		});
	}

}
