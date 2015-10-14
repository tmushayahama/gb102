<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbChecklistTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_checklist', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'checklist_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_checklist_id', 'checklist_parent_checklist_id')->references('id')->on('gb_checklist')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_checklist', function(Blueprint $table)
		{
			$table->dropForeign('checklist_creator_id');
			$table->dropForeign('checklist_parent_checklist_id');
		});
	}

}
