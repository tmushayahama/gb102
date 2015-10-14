<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'skill_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('level_id', 'skill_level_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_skill_id', 'skill_parent_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill', function(Blueprint $table)
		{
			$table->dropForeign('skill_creator_id');
			$table->dropForeign('skill_level_id');
			$table->dropForeign('skill_parent_skill_id');
		});
	}

}
