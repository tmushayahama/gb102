<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromisePlayAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_play_answer', function(Blueprint $table)
		{
			$table->foreign('promise_id', 'promise_play_answer_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('promise_modified_id', 'promise_play_answer_promise_modified_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('creator_id', 'promise_play_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_play_answer', function(Blueprint $table)
		{
			$table->dropForeign('promise_play_answer_promise_id');
			$table->dropForeign('promise_play_answer_promise_modified_id');
			$table->dropForeign('promise_play_creator_id');
		});
	}

}
