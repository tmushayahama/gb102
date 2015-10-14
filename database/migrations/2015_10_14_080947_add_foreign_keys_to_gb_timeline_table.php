<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_timeline', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'timeline_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_timeline_id', 'timeline_parent_timeline_id')->references('id')->on('gb_timeline')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_timeline', function(Blueprint $table)
		{
			$table->dropForeign('timeline_creator_id');
			$table->dropForeign('timeline_parent_timeline_id');
		});
	}

}
