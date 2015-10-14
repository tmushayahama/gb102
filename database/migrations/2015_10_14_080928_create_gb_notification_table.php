<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbNotificationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_notification', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('sender_id')->index('notification_sender_id');
			$table->integer('recipient_id')->default(1)->index('notification_recipient_id');
			$table->integer('source_id');
			$table->string('title', 500)->default('');
			$table->string('message', 500)->default('');
			$table->integer('type_id')->index('notification_type_id');
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
		Schema::drop('gb_notification');
	}

}
