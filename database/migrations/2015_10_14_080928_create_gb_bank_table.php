<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbBankTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_bank', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('source_id')->nullable();
			$table->integer('creator_id')->default(0)->index('bank_creator_id');
			$table->integer('times_used')->default(0);
			$table->integer('views')->default(0);
			$table->integer('likes')->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('gb_bank');
	}

}
