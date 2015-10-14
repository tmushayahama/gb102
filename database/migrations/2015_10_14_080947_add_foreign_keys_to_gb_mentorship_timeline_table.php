<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_timeline', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'mentorship_timeline_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('timeline_id', 'mentorship_timeline_timeline_id')->references('id')->on('gb_timeline')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_timeline', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_timeline_mentorship_id');
			$table->dropForeign('mentorship_timeline_timeline_id');
		});
	}

}
