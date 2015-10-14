<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbPromiseQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_promise_question', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('question_id')->index('promise_question_question_id');
			$table->integer('promise_id')->index('promise_question_promise_id');
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
		Schema::drop('gb_promise_question');
	}

}
