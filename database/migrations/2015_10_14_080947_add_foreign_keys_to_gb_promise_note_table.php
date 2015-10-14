<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_note', function(Blueprint $table)
		{
			$table->foreign('note_id', 'promise_note_note_id')->references('id')->on('gb_note')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('promise_id', 'promise_note_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_note', function(Blueprint $table)
		{
			$table->dropForeign('promise_note_note_id');
			$table->dropForeign('promise_note_promise_id');
		});
	}

}
