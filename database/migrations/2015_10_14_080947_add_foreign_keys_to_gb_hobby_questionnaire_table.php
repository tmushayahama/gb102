<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyQuestionnaireTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_questionnaire', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_questionnaire_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('questionnaire_id', 'hobby_questionnaire_questionnaire_id')->references('id')->on('gb_questionnaire')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_questionnaire', function(Blueprint $table)
		{
			$table->dropForeign('hobby_questionnaire_hobby_id');
			$table->dropForeign('hobby_questionnaire_questionnaire_id');
		});
	}

}
