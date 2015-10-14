<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_contributor', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_contributor_id')->nullable()->index('contributor_parent_contributor_id');
			$table->integer('creator_id')->index('contributor_creator_id');
			$table->string('description', 1000)->default('');
			$table->dateTime('created_date');
			$table->integer('type_id')->index('contributor_type_id');
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
		Schema::drop('gb_contributor');
	}

}
