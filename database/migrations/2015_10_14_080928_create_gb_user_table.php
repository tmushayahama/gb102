<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_user', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('email', 128)->unique('gb_user_email');
			$table->string('password', 128);
			$table->string('remember_token', 100)->nullable();
			$table->timestamps();
			$table->integer('superuser')->default(0);
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
		Schema::drop('gb_user');
	}

}
