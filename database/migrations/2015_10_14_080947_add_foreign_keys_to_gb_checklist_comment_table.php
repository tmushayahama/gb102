<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbChecklistCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_checklist_comment', function(Blueprint $table)
		{
			$table->foreign('checklist_id', 'checklist_comment_checklist_id')->references('id')->on('gb_checklist')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('comment_id', 'checklist_comment_comment_id')->references('id')->on('gb_comment')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_checklist_comment', function(Blueprint $table)
		{
			$table->dropForeign('checklist_comment_checklist_id');
			$table->dropForeign('checklist_comment_comment_id');
		});
	}

}
