<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_contributor', function(Blueprint $table)
		{
			$table->foreign('contributor_id', 'skill_contributor_contributor_id')->references('id')->on('gb_contributor')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'skill_contributor_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'skill_contributor_type_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_contributor', function(Blueprint $table)
		{
			$table->dropForeign('skill_contributor_contributor_id');
			$table->dropForeign('skill_contributor_skill_id');
			$table->dropForeign('skill_contributor_type_id');
		});
	}

}
