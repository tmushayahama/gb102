<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbProjectAdvicePageTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_project_advice_page', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('advice_page_id')->index('project_advice_page_advice_page_id');
			$table->integer('project_id')->index('project_advice_page_project_id');
			$table->integer('role');
			$table->string('description', 1000)->default('');
			$table->integer('status')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_project_advice_page');
	}

}
