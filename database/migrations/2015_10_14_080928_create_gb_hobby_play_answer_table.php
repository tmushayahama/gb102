<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbHobbyPlayAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_hobby_play_answer', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('hobby_id')->index('hobby_play_answer_hobby_id');
			$table->integer('creator_id')->index('hobby_play_creator_id');
			$table->integer('hobby_modified_id')->nullable()->index('hobby_play_answer_hobby_modified_id');
			$table->integer('hobby_play_answer');
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
		Schema::drop('gb_hobby_play_answer');
	}

}
