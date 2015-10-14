<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_comment', function(Blueprint $table)
		{
			$table->foreign('comment_id', 'promise_comment_comment_id')->references('id')->on('gb_comment')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('promise_id', 'promise_comment_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_comment', function(Blueprint $table)
		{
			$table->dropForeign('promise_comment_comment_id');
			$table->dropForeign('promise_comment_promise_id');
		});
	}

}
