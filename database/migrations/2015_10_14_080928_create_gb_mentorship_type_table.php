<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipTypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship_type', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('category', 50);
			$table->string('type', 50);
			$table->string('description', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_mentorship_type');
	}

}
