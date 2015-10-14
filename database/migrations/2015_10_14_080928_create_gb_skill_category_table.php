<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbSkillCategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_skill_category', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('category_id')->index('skill_category_category_id');
			$table->integer('skill_id')->index('skill_category_skill_id');
			$table->string('description', 150)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_skill_category');
	}

}
