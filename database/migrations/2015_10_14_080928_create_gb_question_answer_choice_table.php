<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbQuestionAnswerChoiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_question_answer_choice', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('question_id')->index('question_id');
			$table->string('answer', 150)->default('');
			$table->string('description', 1000)->default('');
			$table->integer('type')->default(0);
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
		Schema::drop('gb_question_answer_choice');
	}

}
