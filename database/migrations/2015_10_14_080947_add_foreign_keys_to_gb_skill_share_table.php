<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbSkillShareTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_skill_share', function(Blueprint $table)
		{
			$table->foreign('share_to_id', 'skill_share_share_to_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_skill_share', function(Blueprint $table)
		{
			$table->dropForeign('skill_share_share_to_id');
		});
	}

}
