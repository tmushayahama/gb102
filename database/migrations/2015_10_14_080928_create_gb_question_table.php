<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbQuestionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_question', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('creator_id')->index('question_creator_id');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date')->nullable();
			$table->integer('type')->default(0);
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
		Schema::drop('gb_question');
	}

}
