<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice_announcement', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('announcement_id')->index('advice_announcement_announcement_id');
			$table->integer('advice_id')->index('advice_announcement_advice_id');
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
		Schema::drop('gb_advice_announcement');
	}

}
