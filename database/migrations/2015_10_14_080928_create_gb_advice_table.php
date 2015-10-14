<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbAdviceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_advice', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('parent_advice_id')->nullable()->index('advice_parent_advice_id');
			$table->integer('creator_id')->index('advice_creator_id');
			$table->integer('mentor_id')->nullable()->index('advice_mentor_id');
			$table->integer('mentee_id')->nullable()->index('advice_mentee_id');
			$table->integer('type_id')->nullable()->index('advice_type_id');
			$table->string('advice_picture_url', 250)->default('advice_default.png');
			$table->string('title', 100);
			$table->string('description', 500)->default('');
			$table->dateTime('created_date')->nullable();
			$table->integer('level_id')->index('advice_level_id');
			$table->integer('bank_id')->nullable()->index('advice_bank_id');
			$table->integer('privacy')->default(0);
			$table->integer('order')->default(1);
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
		Schema::drop('gb_advice');
	}

}
