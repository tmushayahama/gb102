<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbPromiseTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_promise_timeline', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('timeline_id')->index('promise_timeline_timeline_id');
			$table->integer('promise_id')->index('promise_timeline_promise_id');
			$table->integer('day');
			$table->integer('type')->default(0);
			$table->integer('privacy')->default(0);
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
		Schema::drop('gb_promise_timeline');
	}

}
