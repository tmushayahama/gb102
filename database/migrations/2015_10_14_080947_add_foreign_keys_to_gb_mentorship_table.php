<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbMentorshipTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_mentorship', function(Blueprint $table)
		{
			$table->foreign('bank_id', 'mentorship_bank_id')->references('id')->on('gb_bank')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('creator_id', 'mentorship_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('level_id', 'mentorship_level_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentee_id', 'mentorship_mentee_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('mentor_id', 'mentorship_mentor_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_mentorship_id', 'mentorship_parent_mentorship_id')->references('id')->on('gb_mentorship')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'mentorship_type_id')->references('id')->on('gb_mentorship_type')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_mentorship', function(Blueprint $table)
		{
			$table->dropForeign('mentorship_bank_id');
			$table->dropForeign('mentorship_creator_id');
			$table->dropForeign('mentorship_level_id');
			$table->dropForeign('mentorship_mentee_id');
			$table->dropForeign('mentorship_mentor_id');
			$table->dropForeign('mentorship_parent_mentorship_id');
			$table->dropForeign('mentorship_type_id');
		});
	}

}
