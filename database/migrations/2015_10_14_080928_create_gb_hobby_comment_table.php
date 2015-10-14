<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbHobbyCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_hobby_comment', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('comment_id')->index('hobby_comment_comment_id');
			$table->integer('hobby_id')->index('hobby_comment_hobby_id');
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
		Schema::drop('gb_hobby_comment');
	}

}
