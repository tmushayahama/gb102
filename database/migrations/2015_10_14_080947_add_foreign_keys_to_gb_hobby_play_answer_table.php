<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyPlayAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_play_answer', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_play_answer_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('hobby_modified_id', 'hobby_play_answer_hobby_modified_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('creator_id', 'hobby_play_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_play_answer', function(Blueprint $table)
		{
			$table->dropForeign('hobby_play_answer_hobby_id');
			$table->dropForeign('hobby_play_answer_hobby_modified_id');
			$table->dropForeign('hobby_play_creator_id');
		});
	}

}
