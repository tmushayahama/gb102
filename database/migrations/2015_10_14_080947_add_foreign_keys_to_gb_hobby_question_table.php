<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_question', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_question_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('question_id', 'hobby_question_question_id')->references('id')->on('gb_question')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_question', function(Blueprint $table)
		{
			$table->dropForeign('hobby_question_hobby_id');
			$table->dropForeign('hobby_question_question_id');
		});
	}

}
