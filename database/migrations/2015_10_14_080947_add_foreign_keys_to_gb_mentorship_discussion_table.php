<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_discussion', function(Blueprint $table)
		{
			$table->foreign('discussion_id', 'mentorship_discussion_discussion_id')->references('id')->on('gb_discussion')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentorship_id', 'mentorship_discussion_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_discussion', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_discussion_discussion_id');
			$table->dropForeign('mentorship_discussion_mentorship_id');
		});
	}

}
