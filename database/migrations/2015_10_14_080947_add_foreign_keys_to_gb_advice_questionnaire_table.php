<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceQuestionnaireTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice_questionnaire', function(Blueprint $table)
		{
			$table->foreign('advice_id', 'advice_questionnaire_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('questionnaire_id', 'advice_questionnaire_questionnaire_id')->references('id')->on('gb_questionnaire')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice_questionnaire', function(Blueprint $table)
		{
			$table->dropForeign('advice_questionnaire_advice_id');
			$table->dropForeign('advice_questionnaire_questionnaire_id');
		});
	}

}
