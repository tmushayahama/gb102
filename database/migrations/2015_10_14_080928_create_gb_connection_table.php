<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbConnectionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_connection', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('name', 50);
			$table->string('connection_picture', 50)->nullable();
			$table->string('description', 150)->nullable();
			$table->dateTime('created_date');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_connection');
	}

}
