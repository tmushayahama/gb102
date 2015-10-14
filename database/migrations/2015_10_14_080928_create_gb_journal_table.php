<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbJournalTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_journal', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('creator_id')->index('journal_creator_id');
			$table->integer('skill_id')->nullable()->index('journal_skill_id');
			$table->integer('level_id')->nullable()->index('journal_level_id');
			$table->string('title', 100);
			$table->string('description', 500);
			$table->dateTime('created_date');
			$table->integer('status')->nullable()->default(0);
			$table->integer('order')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_journal');
	}

}
