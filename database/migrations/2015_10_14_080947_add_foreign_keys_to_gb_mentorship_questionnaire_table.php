<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipQuestionnaireTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_questionnaire', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'mentorship_questionnaire_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('questionnaire_id', 'mentorship_questionnaire_questionnaire_id')->references('id')->on('gb_questionnaire')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_questionnaire', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_questionnaire_mentorship_id');
			$table->dropForeign('mentorship_questionnaire_questionnaire_id');
		});
	}

}
