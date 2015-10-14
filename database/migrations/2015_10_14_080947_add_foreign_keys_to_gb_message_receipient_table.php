<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMessageReceipientTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_message_receipient', function(Blueprint $table)
		{
			$table->foreign('message_id', 'message_message_id')->references('id')->on('gb_message')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('receipient_id', 'message_receipient_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_message_receipient', function(Blueprint $table)
		{
			$table->dropForeign('message_message_id');
			$table->dropForeign('message_receipient_id');
		});
	}

}
