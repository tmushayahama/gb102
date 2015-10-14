<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbAdviceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_advice', function(Blueprint $table)
		{
			$table->foreign('bank_id', 'advice_bank_id')->references('id')->on('gb_bank')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('creator_id', 'advice_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('level_id', 'advice_level_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentee_id', 'advice_mentee_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentor_id', 'advice_mentor_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_advice_id', 'advice_parent_advice_id')->references('id')->on('gb_advice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'advice_type_id')->references('id')->on('gb_advice_type')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_advice', function(Blueprint $table)
		{
			$table->dropForeign('advice_bank_id');
			$table->dropForeign('advice_creator_id');
			$table->dropForeign('advice_level_id');
			$table->dropForeign('advice_mentee_id');
			$table->dropForeign('advice_mentor_id');
			$table->dropForeign('advice_parent_advice_id');
			$table->dropForeign('advice_type_id');
		});
	}

}
