<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGbProjectMemberTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('gb_project_member', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('member_id')->index('project_member_member_id');
			$table->integer('inviter_id')->nullable()->index('project_member_inviter_id');
			$table->integer('acceptee_id')->nullable()->index('project_member_acceptee_id');
			$table->integer('project_id')->index('project_member_project_id');
			$table->integer('role');
			$table->string('description', 1000)->default('');
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
		Schema::drop('gb_project_member');
	}

}
