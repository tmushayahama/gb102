<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipPromiseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship_promise', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('promise_id')->index('mentorship_promise_promise_id');
			$table->integer('mentorship_id')->index('mentorship_promise_mentorship_id');
			$table->integer('creator_id')->index('mentorship_promise_creator_id');
			$table->dateTime('created_date');
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
		Schema::drop('gb_mentorship_promise');
	}

}
