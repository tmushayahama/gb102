<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_weblink', function(Blueprint $table)
		{
			$table->foreign('promise_id', 'promise_weblink_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('weblink_id', 'promise_weblink_weblink_id')->references('id')->on('gb_weblink')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_weblink', function(Blueprint $table)
		{
			$table->dropForeign('promise_weblink_promise_id');
			$table->dropForeign('promise_weblink_weblink_id');
		});
	}

}
