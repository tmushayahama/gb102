<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceQuestionAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice_question_answer', function(Blueprint $table)
		{
			$table->foreign('advice_id', 'advice_question_answer_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('question_answer_id', 'advice_question_answer_question_answer_id')->references('id')->on('gb_question_answer_choice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('question_id', 'advice_question_answer_question_id')->references('id')->on('gb_question')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('user_id', 'advice_question_answer_user_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice_question_answer', function(Blueprint $table)
		{
			$table->dropForeign('advice_question_answer_advice_id');
			$table->dropForeign('advice_question_answer_question_answer_id');
			$table->dropForeign('advice_question_answer_question_id');
			$table->dropForeign('advice_question_answer_user_id');
		});
	}

}
