<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_contributor', function(Blueprint $table)
		{
			$table->foreign('contributor_id', 'mentorship_contributor_contributor_id')->references('id')->on('gb_contributor')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentorship_id', 'mentorship_contributor_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_contributor', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_contributor_contributor_id');
			$table->dropForeign('mentorship_contributor_mentorship_id');
		});
	}

}
