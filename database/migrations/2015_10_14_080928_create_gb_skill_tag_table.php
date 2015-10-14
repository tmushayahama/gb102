<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbSkillTagTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_skill_tag', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('skill_id')->index('skill_tag_skill_id');
			$table->integer('tag_id')->index('skill_tag_tag_id');
			$table->integer('tagger_id')->index('skill_tag_tagger_id');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_skill_tag');
	}

}
