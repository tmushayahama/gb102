<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipHobbyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship_hobby', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('hobby_id')->index('mentorship_hobby_hobby_id');
			$table->integer('mentorship_id')->index('mentorship_hobby_mentorship_id');
			$table->integer('creator_id')->index('mentorship_hobby_creator_id');
			$table->dateTime('created_date');
			$table->integer('type')->default(0);
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
		Schema::drop('gb_mentorship_hobby');
	}

}
