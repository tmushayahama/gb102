<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbSkillQuestionnaireTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_skill_questionnaire', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('questionnaire_id')->index('skill_questionnaire_questionnaire_id');
			$table->integer('skill_id')->index('skill_questionnaire_skill_id');
			$table->integer('privacy')->default(0);
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
		Schema::drop('gb_skill_questionnaire');
	}

}
