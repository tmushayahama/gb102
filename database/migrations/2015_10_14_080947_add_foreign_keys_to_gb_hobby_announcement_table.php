<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_announcement', function(Blueprint $table)
		{
			$table->foreign('announcement_id', 'hobby_announcement_announcement_id')->references('id')->on('gb_announcement')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('hobby_id', 'hobby_announcement_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_announcement', function(Blueprint $table)
		{
			$table->dropForeign('hobby_announcement_announcement_id');
			$table->dropForeign('hobby_announcement_hobby_id');
		});
	}

}
