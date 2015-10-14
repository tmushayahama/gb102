<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_tag', function(Blueprint $table)
		{
			$table->foreign('tag_creator_id', 'tag_tag_creator_id')->references('id')->on('gb_tag')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_tag', function(Blueprint $table)
		{
			$table->dropForeign('tag_tag_creator_id');
		});
	}

}
