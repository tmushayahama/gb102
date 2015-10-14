<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_timeline', function(Blueprint $table)
		{
			$table->foreign('promise_id', 'promise_timeline_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('timeline_id', 'promise_timeline_timeline_id')->references('id')->on('gb_timeline')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_timeline', function(Blueprint $table)
		{
			$table->dropForeign('promise_timeline_promise_id');
			$table->dropForeign('promise_timeline_timeline_id');
		});
	}

}
