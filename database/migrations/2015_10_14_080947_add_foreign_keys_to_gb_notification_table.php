<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbNotificationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_notification', function(Blueprint $table)
		{
			$table->foreign('recipient_id', 'notification_recipient_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('sender_id', 'notification_sender_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'notification_type_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_notification', function(Blueprint $table)
		{
			$table->dropForeign('notification_recipient_id');
			$table->dropForeign('notification_sender_id');
			$table->dropForeign('notification_type_id');
		});
	}

}
