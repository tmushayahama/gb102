<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbMentorshipTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_mentorship', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_mentorship_id')->nullable()->index('mentorship_parent_mentorship_id');
			$table->integer('creator_id')->index('mentorship_creator_id');
			$table->integer('mentor_id')->nullable()->index('mentorship_mentor_id');
			$table->integer('mentee_id')->nullable()->index('mentorship_mentee_id');
			$table->integer('type_id')->nullable()->index('mentorship_type_id');
			$table->string('mentorship_picture_url', 250)->default('mentorship_default.png');
			$table->string('title', 100);
			$table->string('description', 500)->default('');
			$table->dateTime('created_date')->nullable();
			$table->integer('level_id')->index('mentorship_level_id');
			$table->integer('bank_id')->nullable()->index('mentorship_bank_id');
			$table->integer('privacy')->default(0);
			$table->integer('order')->default(1);
			$table->integer('status')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_mentorship');
	}

}
