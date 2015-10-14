<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_announcement', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('announcer_id')->index('announcement_announcer_id');
			$table->integer('receiver_id')->nullable()->index('announcement_receiver_id');
			$table->string('title', 200);
			$table->string('description', 1000)->default('');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_announcement');
	}

}
