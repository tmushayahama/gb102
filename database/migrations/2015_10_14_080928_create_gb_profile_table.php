<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbProfileTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_profile', function(Blueprint $table)
		{
			$table->integer('user_id', true);
			$table->string('lastname', 100)->default('');
			$table->string('firstname', 100)->default('');
			$table->string('welcome_message', 1000)->default('');
			$table->string('summary', 1000)->default('');
			$table->string('experience', 1000)->default('');
			$table->string('interests', 1000)->default('');
			$table->string('favorite_quote', 1000)->default('');
			$table->string('avatar_url', 200)->default('gb_default_avatar.png');
			$table->string('gender', 3)->nullable();
			$table->date('birthdate')->nullable();
			$table->string('phone_number', 20)->default('');
			$table->string('address')->default('');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_profile');
	}

}
