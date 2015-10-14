<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbPromiseTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_promise_tag', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('promise_id')->index('promise_tag_promise_id');
			$table->integer('tag_id')->index('promise_tag_tag_id');
			$table->integer('tagger_id')->index('promise_tag_tagger_id');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_promise_tag');
	}

}
