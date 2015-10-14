<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbPostTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_post', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'post_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'post_type_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_post', function(Blueprint $table)
		{
			$table->dropForeign('post_creator_id');
			$table->dropForeign('post_type_id');
		});
	}

}
