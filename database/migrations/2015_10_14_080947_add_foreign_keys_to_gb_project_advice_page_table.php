<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbProjectAdvicePageTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_project_advice_page', function(Blueprint $table)
		{
			$table->foreign('advice_page_id', 'project_advice_page_advice_page_id')->references('id')->on('gb_advice_page')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('project_id', 'project_advice_page_project_id')->references('id')->on('gb_project')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_project_advice_page', function(Blueprint $table)
		{
			$table->dropForeign('project_advice_page_advice_page_id');
			$table->dropForeign('project_advice_page_project_id');
		});
	}

}
