<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbProjectTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_project', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->string('name');
			$table->string('description', 1000)->default('');
			$table->integer('creator_id')->index('project_creator_id');
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
		Schema::drop('gb_project');
	}

}
