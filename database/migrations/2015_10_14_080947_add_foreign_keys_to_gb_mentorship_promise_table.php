<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipPromiseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_promise', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'mentorship_promise_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentorship_id', 'mentorship_promise_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('promise_id', 'mentorship_promise_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_promise', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_promise_creator_id');
			$table->dropForeign('mentorship_promise_mentorship_id');
			$table->dropForeign('mentorship_promise_promise_id');
		});
	}

}
