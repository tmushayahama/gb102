<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_discussion', function(Blueprint $table)
		{
			$table->foreign('discussion_id', 'promise_discussion_discussion_id')->references('id')->on('gb_discussion')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('promise_id', 'promise_discussion_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_discussion', function(Blueprint $table)
		{
			$table->dropForeign('promise_discussion_discussion_id');
			$table->dropForeign('promise_discussion_promise_id');
		});
	}

}
