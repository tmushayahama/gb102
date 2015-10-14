<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship_weblink', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('weblink_id')->index('mentorship_weblink_weblink_id');
			$table->integer('mentorship_id')->index('mentorship_weblink_mentorship_id');
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
		Schema::drop('gb_mentorship_weblink');
	}

}
