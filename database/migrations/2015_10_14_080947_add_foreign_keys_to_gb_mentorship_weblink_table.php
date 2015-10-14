<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_weblink', function(Blueprint $table)
		{
			$table->foreign('mentorship_id', 'mentorship_weblink_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('weblink_id', 'mentorship_weblink_weblink_id')->references('id')->on('gb_weblink')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_weblink', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_weblink_mentorship_id');
			$table->dropForeign('mentorship_weblink_weblink_id');
		});
	}

}
