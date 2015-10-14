<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillQuestionnaireTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_questionnaire', function(Blueprint $table)
		{
			$table->foreign('questionnaire_id', 'skill_questionnaire_questionnaire_id')->references('id')->on('gb_questionnaire')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'skill_questionnaire_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_questionnaire', function(Blueprint $table)
		{
			$table->dropForeign('skill_questionnaire_questionnaire_id');
			$table->dropForeign('skill_questionnaire_skill_id');
		});
	}

}
