<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship_announcement', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('announcement_id')->index('mentorship_announcement_announcement_id');
			$table->integer('mentorship_id')->index('mentorship_announcement_mentorship_id');
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
		Schema::drop('gb_mentorship_announcement');
	}

}
