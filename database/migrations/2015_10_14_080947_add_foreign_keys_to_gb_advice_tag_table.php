<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice_tag', function(Blueprint $table)
		{
			$table->foreign('advice_id', 'advice_tag_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tag_id', 'advice_tag_tag_id')->references('id')->on('gb_tag')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('tagger_id', 'advice_tag_tagger_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice_tag', function(Blueprint $table)
		{
			$table->dropForeign('advice_tag_advice_id');
			$table->dropForeign('advice_tag_tag_id');
			$table->dropForeign('advice_tag_tagger_id');
		});
	}

}
