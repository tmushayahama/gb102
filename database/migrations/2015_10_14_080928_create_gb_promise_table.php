<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbPromiseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_promise', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_promise_id')->nullable()->index('promise_parent_promise_id');
			$table->integer('creator_id')->index('promise_creator_id');
			$table->integer('type_id')->nullable()->index('promise_type_id');
			$table->string('promise_picture_url', 250)->default('promise_default.png');
			$table->string('title', 100);
			$table->string('description', 500)->default('');
			$table->dateTime('created_date')->nullable();
			$table->integer('level_id')->index('promise_level_id');
			$table->integer('points')->default(0);
			$table->integer('privacy')->default(0);
			$table->integer('order')->default(1);
			$table->integer('status')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_promise');
	}

}
