<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbHobbyTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_hobby_tag', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('hobby_id')->index('hobby_tag_hobby_id');
			$table->integer('tag_id')->index('hobby_tag_tag_id');
			$table->integer('tagger_id')->index('hobby_tag_tagger_id');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_hobby_tag');
	}

}
