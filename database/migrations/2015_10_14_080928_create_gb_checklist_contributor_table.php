<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbChecklistContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_checklist_contributor', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('contributor_id')->index('checklist_contributor_contributor_id');
			$table->integer('checklist_id')->index('checklist_contributor_checklist_id');
			$table->integer('type_id')->default(1);
			$table->integer('status')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_checklist_contributor');
	}

}
