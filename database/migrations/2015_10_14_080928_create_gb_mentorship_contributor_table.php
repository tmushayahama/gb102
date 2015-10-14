<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship_contributor', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('contributor_id')->index('mentorship_contributor_contributor_id');
			$table->integer('mentorship_id')->index('mentorship_contributor_mentorship_id');
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
		Schema::drop('gb_mentorship_contributor');
	}

}
