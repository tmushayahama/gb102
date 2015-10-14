<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbChecklistCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_checklist_comment', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('comment_id')->index('checklist_comment_comment_id');
			$table->integer('checklist_id')->index('checklist_comment_checklist_id');
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
		Schema::drop('gb_checklist_comment');
	}

}
