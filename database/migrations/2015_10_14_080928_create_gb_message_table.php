<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMessageTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_message', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('type');
			$table->integer('sender_id')->index('message_sender_id');
			$table->integer('title');
			$table->integer('subject');
			$table->string('body', 5000)->default('');
			$table->dateTime('created_date');
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
		Schema::drop('gb_message');
	}

}
