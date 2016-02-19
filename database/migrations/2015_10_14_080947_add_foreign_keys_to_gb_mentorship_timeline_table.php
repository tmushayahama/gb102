<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipProgressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_progress', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'mentorship_progress_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('progress_id', 'mentorship_progress_progress_id')->references('id')->on('gb_progress')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_progress', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_progress_mentorship_id');
			$table->dropForeign('mentorship_progress_progress_id');
		});
	}

}
