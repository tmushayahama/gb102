<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_discussion', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_discussion_id')->nullable()->index('discussion_parent_discussion_id');
			$table->integer('creator_id')->index('discussion_creator_id');
			$table->string('description', 1000)->default('');
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
		Schema::drop('gb_discussion');
	}

}
