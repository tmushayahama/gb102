<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_question', function(Blueprint $table)
		{
			$table->foreign('promise_id', 'promise_question_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('question_id', 'promise_question_question_id')->references('id')->on('gb_question')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_question', function(Blueprint $table)
		{
			$table->dropForeign('promise_question_promise_id');
			$table->dropForeign('promise_question_question_id');
		});
	}

}
