<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbProgressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_progress', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_progress_id')->nullable()->index('progress_parent_progress_id');
			$table->integer('creator_id')->index('progress_creator_id');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
			$table->dateTime('progress_date');
			$table->integer('day')->default(1);
			$table->string('progress_color', 6)->default('FFFFFF');
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
		Schema::drop('gb_progress');
	}

}
