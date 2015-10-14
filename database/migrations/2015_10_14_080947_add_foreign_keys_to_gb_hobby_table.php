<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby', function(Blueprint $table)
		{
			$table->foreign('bank_id', 'hobby_bank_id')->references('id')->on('gb_bank')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('creator_id', 'hobby_creator_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('level_id', 'hobby_level_id')->references('id')->on('gb_level')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('parent_hobby_id', 'hobby_parent_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('type_id', 'hobby_type_id')->references('id')->on('gb_hobby_type')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby', function(Blueprint $table)
		{
			$table->dropForeign('hobby_bank_id');
			$table->dropForeign('hobby_creator_id');
			$table->dropForeign('hobby_level_id');
			$table->dropForeign('hobby_parent_hobby_id');
			$table->dropForeign('hobby_type_id');
		});
	}

}
