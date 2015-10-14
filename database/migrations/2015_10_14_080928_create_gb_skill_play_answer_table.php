<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbSkillPlayAnswerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_skill_play_answer', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('skill_id')->index('skill_play_answer_skill_id');
			$table->integer('creator_id')->index('skill_play_answer_creator_id');
			$table->integer('skill_modified_id')->nullable()->index('skill_play_answer_skill_modified_id');
			$table->integer('skill_level_id')->index('skill_play_answer_skill_level_id');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
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
		Schema::drop('gb_skill_play_answer');
	}

}
