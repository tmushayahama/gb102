<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_question', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'question_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_question', function(Blueprint $table)
		{
			$table->dropForeign('question_creator_id');
		});
	}

}
