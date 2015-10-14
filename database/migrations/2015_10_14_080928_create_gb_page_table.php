<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbPageTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_page', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('creator_id')->index('page_creator_id');
			$table->string('title', 200);
			$table->string('description', 1000);
			$table->integer('type')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_page');
	}

}
