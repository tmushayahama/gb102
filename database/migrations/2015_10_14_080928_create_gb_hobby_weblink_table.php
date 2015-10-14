<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbHobbyWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_hobby_weblink', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('weblink_id')->index('hobby_weblink_weblink_id');
			$table->integer('hobby_id')->index('hobby_weblink_hobby_id');
			$table->integer('privacy')->default(0);
			$table->integer('status')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_hobby_weblink');
	}

}
