<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbPostTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_post', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('creator_id')->index('post_creator_id');
			$table->integer('source_id');
			$table->integer('type_id')->index('post_type_id');
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
		Schema::drop('gb_post');
	}

}
