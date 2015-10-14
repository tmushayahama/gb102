<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_weblink', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_weblink_id')->nullable()->index('weblink_parent_weblink_id');
			$table->string('link', 1000);
			$table->string('title', 150);
			$table->integer('creator_id')->index('weblink_creator_id');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
			$table->integer('importance')->default(1);
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
		Schema::drop('gb_weblink');
	}

}
