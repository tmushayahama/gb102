<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbCategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_category', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('type', 100);
			$table->string('code', 10);
			$table->string('name', 100);
			$table->string('description', 500)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_category');
	}

}
