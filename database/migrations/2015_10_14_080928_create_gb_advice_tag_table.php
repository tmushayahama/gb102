<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice_tag', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('advice_id')->index('advice_tag_advice_id');
			$table->integer('tag_id')->index('advice_tag_tag_id');
			$table->integer('tagger_id')->index('advice_tag_tagger_id');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_advice_tag');
	}

}
