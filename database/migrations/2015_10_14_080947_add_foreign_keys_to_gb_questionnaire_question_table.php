<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbQuestionnaireQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_questionnaire_question', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'questionnaire_question_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('question_id', 'questionnaire_question_question_id')->references('id')->on('gb_question')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('questionnaire_id', 'questionnaire_question_questionnaire_id')->references('id')->on('gb_questionnaire_question')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_questionnaire_question', function(Blueprint $table)
		{
			$table->dropForeign('questionnaire_question_creator_id');
			$table->dropForeign('questionnaire_question_question_id');
			$table->dropForeign('questionnaire_question_questionnaire_id');
		});
	}

}
