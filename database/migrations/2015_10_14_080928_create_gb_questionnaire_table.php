<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbQuestionnaireTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_questionnaire', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_questionnaire_id')->nullable()->index('questionnaire_parent_questionnaire_id');
			$table->integer('creator_id')->index('questionnaire_creator_id');
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
		Schema::drop('gb_questionnaire');
	}

}
