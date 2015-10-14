<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_timeline', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_timeline_id')->nullable()->index('timeline_parent_timeline_id');
			$table->integer('creator_id')->index('timeline_creator_id');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
			$table->dateTime('timeline_date');
			$table->integer('day')->default(1);
			$table->string('timeline_color', 6)->default('FFFFFF');
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
		Schema::drop('gb_timeline');
	}

}
