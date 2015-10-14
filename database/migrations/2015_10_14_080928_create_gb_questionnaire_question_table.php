<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbQuestionnaireQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_questionnaire_question', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('question_id')->nullable()->index('questionnaire_question_question_id');
			$table->integer('questionnaire_id')->nullable()->index('questionnaire_question_questionnaire_id');
			$table->integer('creator_id')->index('questionnaire_question_creator_id');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
			$table->integer('type')->default(1);
			$table->integer('status')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_questionnaire_question');
	}

}
