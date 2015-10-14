<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_discussion', function(Blueprint $table)
		{
			$table->foreign('discussion_id', 'hobby_discussion_discussion_id')->references('id')->on('gb_discussion')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('hobby_id', 'hobby_discussion_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_discussion', function(Blueprint $table)
		{
			$table->dropForeign('hobby_discussion_discussion_id');
			$table->dropForeign('hobby_discussion_hobby_id');
		});
	}

}
