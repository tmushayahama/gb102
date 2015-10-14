<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_note', function(Blueprint $table)
		{
			$table->foreign('note_id', 'skill_note_note_id')->references('id')->on('gb_note')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'skill_note_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_note', function(Blueprint $table)
		{
			$table->dropForeign('skill_note_note_id');
			$table->dropForeign('skill_note_skill_id');
		});
	}

}
