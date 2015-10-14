<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice_discussion', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('discussion_id')->index('advice_discussion_discussion_id');
			$table->integer('advice_id')->index('advice_discussion_advice_id');
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
		Schema::drop('gb_advice_discussion');
	}

}
