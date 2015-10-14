<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbChecklistContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_checklist_contributor', function(Blueprint $table)
		{
			$table->foreign('checklist_id', 'checklist_contributor_checklist_id')->references('id')->on('gb_checklist_')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('contributor_id', 'checklist_contributor_contributor_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_checklist_contributor', function(Blueprint $table)
		{
			$table->dropForeign('checklist_contributor_checklist_id');
			$table->dropForeign('checklist_contributor_contributor_id');
		});
	}

}
