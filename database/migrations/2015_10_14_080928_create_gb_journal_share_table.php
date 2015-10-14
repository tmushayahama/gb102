<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbJournalShareTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_journal_share', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('journal_id')->index('journal_share_journal_id');
			$table->integer('shared_to_id')->index('journal_share_shared_to_id');
			$table->integer('status')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_journal_share');
	}

}
