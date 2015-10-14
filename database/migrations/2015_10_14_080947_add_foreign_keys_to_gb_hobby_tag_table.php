<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_tag', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_tag_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tag_id', 'hobby_tag_tag_id')->references('id')->on('gb_tag')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tagger_id', 'hobby_tag_tagger_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_tag', function(Blueprint $table)
		{
			$table->dropForeign('hobby_tag_hobby_id');
			$table->dropForeign('hobby_tag_tag_id');
			$table->dropForeign('hobby_tag_tagger_id');
		});
	}

}
