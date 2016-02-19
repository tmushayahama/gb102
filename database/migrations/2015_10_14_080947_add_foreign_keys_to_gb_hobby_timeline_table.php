<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbHobbyProgressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_hobby_progress', function(Blueprint $table)
		{
			$table->foreign('hobby_id', 'hobby_progress_hobby_id')->references('id')->on('gb_hobby')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('progress_id', 'hobby_progress_progress_id')->references('id')->on('gb_progress')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_hobby_progress', function(Blueprint $table)
		{
			$table->dropForeign('hobby_progress_hobby_id');
			$table->dropForeign('hobby_progress_progress_id');
		});
	}

}
