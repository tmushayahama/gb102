<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceTimelineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice_timeline', function(Blueprint $table)
		{
			$table->foreign('advice_id', 'advice_timeline_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('timeline_id', 'advice_timeline_timeline_id')->references('id')->on('gb_timeline')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice_timeline', function(Blueprint $table)
		{
			$table->dropForeign('advice_timeline_advice_id');
			$table->dropForeign('advice_timeline_timeline_id');
		});
	}

}
