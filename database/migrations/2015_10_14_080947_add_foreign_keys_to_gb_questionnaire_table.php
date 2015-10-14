<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbQuestionnaireTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_questionnaire', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'questionnaire_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_questionnaire_id', 'questionnaire_parent_questionnaire_id')->references('id')->on('gb_questionnaire')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_questionnaire', function(Blueprint $table)
		{
			$table->dropForeign('questionnaire_creator_id');
			$table->dropForeign('questionnaire_parent_questionnaire_id');
		});
	}

}
