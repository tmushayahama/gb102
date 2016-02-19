<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbProgressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_progress', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'progress_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_progress_id', 'progress_parent_progress_id')->references('id')->on('gb_progress')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_progress', function(Blueprint $table)
		{
			$table->dropForeign('progress_creator_id');
			$table->dropForeign('progress_parent_progress_id');
		});
	}

}
