<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_note', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'note_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_note_id', 'note_parent_note_id')->references('id')->on('gb_note')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_note', function(Blueprint $table)
		{
			$table->dropForeign('note_creator_id');
			$table->dropForeign('note_parent_note_id');
		});
	}

}
