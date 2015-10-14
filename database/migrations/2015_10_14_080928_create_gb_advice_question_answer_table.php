<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceQuestionAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice_question_answer', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('question_id')->index('advice_question_answer_question_id');
			$table->integer('question_answer_id')->nullable()->index('advice_question_answer_question_answer_id');
			$table->integer('advice_id')->index('advice_question_answer_advice_id');
			$table->dateTime('created_date');
			$table->string('description', 1000)->default('');
			$table->integer('user_id')->index('advice_question_answer_user_id');
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
		Schema::drop('gb_advice_question_answer');
	}

}
