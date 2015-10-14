<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice_contributor', function(Blueprint $table)
		{
			$table->foreign('advice_id', 'advice_contributor_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('contributor_id', 'advice_contributor_contributor_id')->references('id')->on('gb_contributor')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice_contributor', function(Blueprint $table)
		{
			$table->dropForeign('advice_contributor_advice_id');
			$table->dropForeign('advice_contributor_contributor_id');
		});
	}

}
