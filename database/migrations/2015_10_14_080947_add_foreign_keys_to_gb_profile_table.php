<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbProfileTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_profile', function(Blueprint $table)
		{
			$table->foreign('user_id', 'user_profile_id')->references('id')->on('gb_user')->onUpdate('RESTRICT')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_profile', function(Blueprint $table)
		{
			$table->dropForeign('user_profile_id');
		});
	}

}
