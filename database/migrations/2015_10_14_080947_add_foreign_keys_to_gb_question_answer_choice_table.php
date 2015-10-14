<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbQuestionAnswerChoiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_question_answer_choice', function(Blueprint $table)
		{
			$table->foreign('question_id', 'question_id')->references('id')->on('gb_question')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_question_answer_choice', function(Blueprint $table)
		{
			$table->dropForeign('question_id');
		});
	}

}
