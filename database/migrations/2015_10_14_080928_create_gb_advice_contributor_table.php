<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice_contributor', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('contributor_id')->index('advice_contributor_contributor_id');
			$table->integer('advice_id')->index('advice_contributor_advice_id');
			$table->integer('privacy')->default(0);
			$table->integer('status')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_advice_contributor');
	}

}
