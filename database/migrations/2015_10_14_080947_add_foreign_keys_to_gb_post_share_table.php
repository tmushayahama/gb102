<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPostShareTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_post_share', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'post_share_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('post_id', 'post_share_post_id')->references('id')->on('gb_post')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('shared_to_id', 'post_share_shared_to_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_post_share', function(Blueprint $table)
		{
			$table->dropForeign('post_share_creator_id');
			$table->dropForeign('post_share_post_id');
			$table->dropForeign('post_share_shared_to_id');
		});
	}

}
