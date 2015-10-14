<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGbProjectMemberTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('gb_project_member', function(Blueprint $table)
		{
			$table->foreign('acceptee_id', 'project_member_acceptee_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('inviter_id', 'project_member_inviter_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('member_id', 'project_member_member_id')->references('id')->on('gb_user')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('project_id', 'project_member_project_id')->references('id')->on('gb_project')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('gb_project_member', function(Blueprint $table)
		{
			$table->dropForeign('project_member_acceptee_id');
			$table->dropForeign('project_member_inviter_id');
			$table->dropForeign('project_member_member_id');
			$table->dropForeign('project_member_project_id');
		});
	}

}
