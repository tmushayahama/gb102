<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_comment', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_comment_id')->nullable()->index('comment_parent_comment_id');
			$table->integer('creator_id')->index('comment_creator_id');
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
		Schema::drop('gb_comment');
	}

}
