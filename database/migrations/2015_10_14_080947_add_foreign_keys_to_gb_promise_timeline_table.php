<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseProgressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_progress', function(Blueprint $table)
		{
			$table->foreign('promise_id', 'promise_progress_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('progress_id', 'promise_progress_progress_id')->references('id')->on('gb_progress')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_progress', function(Blueprint $table)
		{
			$table->dropForeign('promise_progress_promise_id');
			$table->dropForeign('promise_progress_progress_id');
		});
	}

}
