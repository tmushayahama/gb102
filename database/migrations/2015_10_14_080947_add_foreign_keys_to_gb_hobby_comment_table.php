<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_comment', function(Blueprint $table)
		{
			$table->foreign('comment_id', 'hobby_comment_comment_id')->references('id')->on('gb_comment')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('hobby_id', 'hobby_comment_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_comment', function(Blueprint $table)
		{
			$table->dropForeign('hobby_comment_comment_id');
			$table->dropForeign('hobby_comment_hobby_id');
		});
	}

}
