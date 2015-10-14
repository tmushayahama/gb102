<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_tag', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('tag_creator_id')->index('tag_tag_creator_id');
			$table->string('tag', 1000);
			$table->integer('type')->nullable();
			$table->string('description', 1000);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_tag');
	}

}
