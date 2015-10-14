<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbContributorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_contributor', function(Blueprint $table)
		{
			$table->foreign('creator_id', 'contributor_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_contributor_id', 'contributor_parent_contributor_id')->references('id')->on('gb_contributor')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'contributor_type_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_contributor', function(Blueprint $table)
		{
			$table->dropForeign('contributor_creator_id');
			$table->dropForeign('contributor_parent_contributor_id');
			$table->dropForeign('contributor_type_id');
		});
	}

}
