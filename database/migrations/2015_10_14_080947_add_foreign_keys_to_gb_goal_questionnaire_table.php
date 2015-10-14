<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbGoalQuestionnaireTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_goal_questionnaire', function(Blueprint $table)
		{
			$table->foreign('goal_id', 'goal_questionnaire_goal_id')->references('id')->on('gb_goal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('questionnaire_id', 'goal_questionnaire_questionnaire_id')->references('id')->on('gb_questionnaire')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_goal_questionnaire', function(Blueprint $table)
		{
			$table->dropForeign('goal_questionnaire_goal_id');
			$table->dropForeign('goal_questionnaire_questionnaire_id');
		});
	}

}
