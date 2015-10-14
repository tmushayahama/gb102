<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMessageReceipientTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_message_receipient', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('message_id')->index('message_message_id');
			$table->integer('receipient_id')->index('message_receipient_id');
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
		Schema::drop('gb_message_receipient');
	}

}
