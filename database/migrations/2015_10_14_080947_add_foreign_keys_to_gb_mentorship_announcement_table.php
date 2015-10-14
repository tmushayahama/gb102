<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_announcement', function(Blueprint $table)
		{
			$table->foreign('announcement_id', 'mentorship_announcement_announcement_id')->references('id')->on('gb_announcement')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentorship_id', 'mentorship_announcement_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_announcement', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_announcement_announcement_id');
			$table->dropForeign('mentorship_announcement_mentorship_id');
		});
	}

}
