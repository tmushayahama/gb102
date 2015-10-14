<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbJournalShareTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_journal_share', function(Blueprint $table)
		{
			$table->foreign('journal_id', 'journal_share_journal_id')->references('id')->on('gb_journal')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('shared_to_id', 'journal_share_shared_to_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_journal_share', function(Blueprint $table)
		{
			$table->dropForeign('journal_share_journal_id');
			$table->dropForeign('journal_share_shared_to_id');
		});
	}

}
