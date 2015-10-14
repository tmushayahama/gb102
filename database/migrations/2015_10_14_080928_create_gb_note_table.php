<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbNoteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_note', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_note_id')->nullable()->index('note_parent_note_id');
			$table->string('title', 150)->default('');
			$table->integer('creator_id')->index('note_creator_id');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
			$table->integer('importance')->default(1);
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
		Schema::drop('gb_note');
	}

}
