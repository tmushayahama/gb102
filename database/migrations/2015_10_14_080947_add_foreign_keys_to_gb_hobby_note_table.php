<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_note', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_note_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('note_id', 'hobby_note_note_id')->references('id')->on('gb_note')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_note', function(Blueprint $table)
		{
			$table->dropForeign('hobby_note_hobby_id');
			$table->dropForeign('hobby_note_note_id');
		});
	}

}
