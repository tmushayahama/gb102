<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship_tag', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('mentorship_id')->index('mentorship_tag_mentorship_id');
			$table->integer('tag_id')->index('mentorship_tag_tag_id');
			$table->integer('tagger_id')->index('mentorship_tag_tagger_id');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_mentorship_tag');
	}

}
