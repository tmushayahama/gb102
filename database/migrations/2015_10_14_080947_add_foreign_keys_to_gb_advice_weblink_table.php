<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceWeblinkTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice_weblink', function(Blueprint $table)
		{
			$table->foreign('advice_id', 'advice_weblink_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('weblink_id', 'advice_weblink_weblink_id')->references('id')->on('gb_weblink')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice_weblink', function(Blueprint $table)
		{
			$table->dropForeign('advice_weblink_advice_id');
			$table->dropForeign('advice_weblink_weblink_id');
		});
	}

}
