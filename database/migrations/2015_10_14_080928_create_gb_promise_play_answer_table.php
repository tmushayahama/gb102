<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbPromisePlayAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_promise_play_answer', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('promise_id')->index('promise_play_answer_promise_id');
			$table->integer('creator_id')->index('promise_play_creator_id');
			$table->integer('promise_modified_id')->nullable()->index('promise_play_answer_promise_modified_id');
			$table->integer('promise_play_answer');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
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
		Schema::drop('gb_promise_play_answer');
	}

}
