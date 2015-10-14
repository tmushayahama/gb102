<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipQuestionAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_question_answer', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'mentorship_question_answer_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('question_answer_id', 'mentorship_question_answer_question_answer_id')->references('id')->on('gb_question_answer_choice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('question_id', 'mentorship_question_answer_question_id')->references('id')->on('gb_question')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('user_id', 'mentorship_question_answer_user_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_question_answer', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_question_answer_mentorship_id');
			$table->dropForeign('mentorship_question_answer_question_answer_id');
			$table->dropForeign('mentorship_question_answer_question_id');
			$table->dropForeign('mentorship_question_answer_user_id');
		});
	}

}
