<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship_discussion', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('discussion_id')->index('mentorship_discussion_discussion_id');
			$table->integer('mentorship_id')->index('mentorship_discussion_mentorship_id');
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
		Schema::drop('gb_mentorship_discussion');
	}

}
