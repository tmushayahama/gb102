<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbChecklistNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_checklist_note', function(Blueprint $table)
		{
			$table->foreign('checklist_id', 'checklist_note_checklist_id')->references('id')->on('gb_checklist')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('note_id', 'checklist_note_note_id')->references('id')->on('gb_note')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_checklist_note', function(Blueprint $table)
		{
			$table->dropForeign('checklist_note_checklist_id');
			$table->dropForeign('checklist_note_note_id');
		});
	}

}
