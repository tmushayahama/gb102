<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbConnectionMemberTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_connection_member', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('connection_id')->index('connection_member_connection_id');
			$table->integer('connection_member_id_1')->index('connection_member_connection_member_id_1');
			$table->integer('connection_member_id_2')->index('connection_member_connection_member_id_2');
			$table->dateTime('added_date');
			$table->integer('privilege')->default(1);
			$table->integer('status')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_connection_member');
	}

}
