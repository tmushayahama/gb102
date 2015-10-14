<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbSkillTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_skill', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_skill_id')->nullable()->index('skill_parent_skill_id');
			$table->integer('creator_id')->index('skill_creator_id');
			$table->string('skill_picture_url', 250)->default('skill_default.png');
			$table->string('title', 500);
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date')->nullable();
			$table->integer('level_id')->index('skill_level_id');
			$table->integer('points')->default(0);
			$table->integer('privacy')->default(0);
			$table->integer('order')->default(1);
			$table->integer('status')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_skill');
	}

}
