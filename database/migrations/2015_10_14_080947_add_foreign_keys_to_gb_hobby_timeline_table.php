<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_timeline', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_timeline_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('timeline_id', 'hobby_timeline_timeline_id')->references('id')->on('gb_timeline')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_timeline', function(Blueprint $table)
		{
			$table->dropForeign('hobby_timeline_hobby_id');
			$table->dropForeign('hobby_timeline_timeline_id');
		});
	}

}
