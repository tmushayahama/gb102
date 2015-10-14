<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbConnectionMemberTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_connection_member', function(Blueprint $table)
		{
			$table->foreign('connection_id', 'connection_member_connection_id')->references('id')->on('gb_connection')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('connection_member_id_1', 'connection_member_connection_member_id_1')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('connection_member_id_2', 'connection_member_connection_member_id_2')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_connection_member', function(Blueprint $table)
		{
			$table->dropForeign('connection_member_connection_id');
			$table->dropForeign('connection_member_connection_member_id_1');
			$table->dropForeign('connection_member_connection_member_id_2');
		});
	}

}
