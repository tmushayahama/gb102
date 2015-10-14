<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice_timeline', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('timeline_id')->index('advice_timeline_timeline_id');
			$table->integer('advice_id')->index('advice_timeline_advice_id');
			$table->integer('day');
			$table->integer('type')->default(0);
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
		Schema::drop('gb_advice_timeline');
	}

}
