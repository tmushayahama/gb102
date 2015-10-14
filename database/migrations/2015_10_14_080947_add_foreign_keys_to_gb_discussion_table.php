<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbDiscussionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_discussion', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'discussion_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_discussion_id', 'discussion_parent_discussion_id')->references('id')->on('gb_discussion')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_discussion', function(Blueprint $table)
		{
			$table->dropForeign('discussion_creator_id');
			$table->dropForeign('discussion_parent_discussion_id');
		});
	}

}
