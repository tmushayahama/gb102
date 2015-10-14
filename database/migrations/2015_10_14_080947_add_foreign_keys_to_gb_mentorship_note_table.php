<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_note', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'mentorship_note_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('note_id', 'mentorship_note_note_id')->references('id')->on('gb_note')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_note', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_note_mentorship_id');
			$table->dropForeign('mentorship_note_note_id');
		});
	}

}
