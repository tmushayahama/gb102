<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbHobbyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_hobby', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_hobby_id')->nullable()->index('hobby_parent_hobby_id');
			$table->integer('creator_id')->index('hobby_creator_id');
			$table->integer('type_id')->nullable()->index('hobby_type_id');
			$table->string('hobby_picture_url', 250)->default('hobby_default.png');
			$table->string('title', 100);
			$table->string('description', 500)->default('');
			$table->dateTime('created_date')->nullable();
			$table->integer('level_id')->index('hobby_level_id');
			$table->integer('bank_id')->nullable()->index('hobby_bank_id');
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
		Schema::drop('gb_hobby');
	}

}
