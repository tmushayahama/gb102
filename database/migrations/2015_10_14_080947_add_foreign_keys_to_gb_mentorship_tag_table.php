<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_tag', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'mentorship_tag_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tag_id', 'mentorship_tag_tag_id')->references('id')->on('gb_tag')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tagger_id', 'mentorship_tag_tagger_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_tag', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_tag_mentorship_id');
			$table->dropForeign('mentorship_tag_tag_id');
			$table->dropForeign('mentorship_tag_tagger_id');
		});
	}

}
