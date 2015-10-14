<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_weblink', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_weblink_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('weblink_id', 'hobby_weblink_weblink_id')->references('id')->on('gb_weblink')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_weblink', function(Blueprint $table)
		{
			$table->dropForeign('hobby_weblink_hobby_id');
			$table->dropForeign('hobby_weblink_weblink_id');
		});
	}

}
