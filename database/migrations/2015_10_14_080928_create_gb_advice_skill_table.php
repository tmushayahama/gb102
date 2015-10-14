<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceSkillTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice_skill', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('skill_id')->index('advice_skill_skill_id');
			$table->integer('advice_id')->index('advice_skill_advice_id');
			$table->integer('creator_id')->index('advice_skill_creator_id');
			$table->dateTime('created_date');
			$table->integer('type')->default(0);
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
		Schema::drop('gb_advice_skill');
	}

}
