<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbPostShareTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_post_share', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('post_id')->index('post_share_post_id');
			$table->integer('creator_id')->index('post_share_creator_id');
			$table->integer('shared_to_id')->index('post_share_shared_to_id');
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
		Schema::drop('gb_post_share');
	}

}
