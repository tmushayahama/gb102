<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPromiseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_promise', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'promise_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('level_id', 'promise_level_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_promise_id', 'promise_parent_promise_id')->references('id')->on('gb_promise')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'promise_type_id')->references('id')->on('gb_promise_type')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_promise', function(Blueprint $table)
		{
			$table->dropForeign('promise_creator_id');
			$table->dropForeign('promise_level_id');
			$table->dropForeign('promise_parent_promise_id');
			$table->dropForeign('promise_type_id');
		});
	}

}
