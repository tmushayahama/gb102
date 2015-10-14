<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_tag', function(Blueprint $table)
		{
			$table->foreign('promise_id', 'promise_tag_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tag_id', 'promise_tag_tag_id')->references('id')->on('gb_tag')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tagger_id', 'promise_tag_tagger_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_tag', function(Blueprint $table)
		{
			$table->dropForeign('promise_tag_promise_id');
			$table->dropForeign('promise_tag_tag_id');
			$table->dropForeign('promise_tag_tagger_id');
		});
	}

}
