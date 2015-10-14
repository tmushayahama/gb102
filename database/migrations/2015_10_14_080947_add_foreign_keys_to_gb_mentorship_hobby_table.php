<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipHobbyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship_hobby', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'mentorship_hobby_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('hobby_id', 'mentorship_hobby_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentorship_id', 'mentorship_hobby_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship_hobby', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_hobby_creator_id');
			$table->dropForeign('mentorship_hobby_hobby_id');
			$table->dropForeign('mentorship_hobby_mentorship_id');
		});
	}

}
