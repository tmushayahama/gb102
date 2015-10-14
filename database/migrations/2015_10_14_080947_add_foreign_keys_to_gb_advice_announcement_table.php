<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceAnnouncementTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice_announcement', function(Blueprint $table)
		{
			$table->foreign('advice_id', 'advice_announcement_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('announcement_id', 'advice_announcement_announcement_id')->references('id')->on('gb_announcement')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice_announcement', function(Blueprint $table)
		{
			$table->dropForeign('advice_announcement_advice_id');
			$table->dropForeign('advice_announcement_announcement_id');
		});
	}

}
