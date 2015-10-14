<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceSkillTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice_skill', function(Blueprint $table)
		{
			$table->foreign('advice_id', 'advice_skill_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('creator_id', 'advice_skill_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('skill_id', 'advice_skill_skill_id')->references('id')->on('gb_skill')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice_skill', function(Blueprint $table)
		{
			$table->dropForeign('advice_skill_advice_id');
			$table->dropForeign('advice_skill_creator_id');
			$table->dropForeign('advice_skill_skill_id');
		});
	}

}
