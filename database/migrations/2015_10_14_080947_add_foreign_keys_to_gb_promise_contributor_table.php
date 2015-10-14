<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise_contributor', function(Blueprint $table)
		{
			$table->foreign('contributor_id', 'promise_contributor_contributor_id')->references('id')->on('gb_contributor')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('promise_id', 'promise_contributor_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise_contributor', function(Blueprint $table)
		{
			$table->dropForeign('promise_contributor_contributor_id');
			$table->dropForeign('promise_contributor_promise_id');
		});
	}

}
