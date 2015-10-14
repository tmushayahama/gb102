<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_announcement', function(Blueprint $table)
		{
			$table->foreign('announcer_id', 'announcement_announcer_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('receiver_id', 'announcement_receiver_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_announcement', function(Blueprint $table)
		{
			$table->dropForeign('announcement_announcer_id');
			$table->dropForeign('announcement_receiver_id');
		});
	}

}
