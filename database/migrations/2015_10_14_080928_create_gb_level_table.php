<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbLevelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_level', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('category', 50);
			$table->string('code', 10);
			$table->string('name', 50);
			$table->string('description', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_level');
	}

}
