<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_announcement', function(Blueprint $table)
		{
			$table->foreign('announcement_id', 'promise_announcement_announcement_id')->references('id')->on('gb_announcement')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('promise_id', 'promise_announcement_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_announcement', function(Blueprint $table)
		{
			$table->dropForeign('promise_announcement_announcement_id');
			$table->dropForeign('promise_announcement_promise_id');
		});
	}

}
