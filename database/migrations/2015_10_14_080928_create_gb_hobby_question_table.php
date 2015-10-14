<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbHobbyQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_hobby_question', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('question_id')->index('hobby_question_question_id');
			$table->integer('hobby_id')->index('hobby_question_hobby_id');
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
		Schema::drop('gb_hobby_question');
	}

}
