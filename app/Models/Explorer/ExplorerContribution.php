<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Contribution\Contribution;
use Request;
use DB;
use JWTAuth;

class ExplorerContribution extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_contribution';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function contribution() {
  return $this->belongsTo('App\Models\Contribution\Contribution', 'contribution_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerContributions($explorerId) {
  $explorerContributions = ExplorerContribution::with('contribution')
          ->with('contribution.creator')
          ->with('contribution.contributor')
          ->with('contribution.level')
          ->with('contribution.status')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerContributions;
 }

 public static function getExplorerContribution($explorerId, $contributionId) {
  $explorerContribution = ExplorerContribution::with('contribution')
          ->where('explorer_id', $explorerId)
          ->where('contribution_id', $contributionId)
          ->first();
  return $explorerContribution->level->name;
 }

 public static function getExplorerContributionLevel($explorerId, $contributionId) {
  $explorerContribution = ExplorerContribution::with('contribution')
          ->where('explorer_id', $explorerId)
          ->where('contribution_id', $contributionId)
          ->with('contribution.level')
          ->first();
  if ($explorerContribution != null) {
   return $explorerContribution;
  }
  return null;
 }

 public static function createExplorerContribution() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorer_id");
  $description = Request::get("description");
  $levelId = Request::get("level_id");
  $contributorId = Request::get("contributor_id");
  $contribution = new Contribution;
  $explorerContribution = new ExplorerContribution;

  $contribution->creator_id = $userId;
  $contribution->contributor_id = $contributorId;
  $contribution->description = $description;
  $contribution->level_id = $levelId;
  $explorerContribution->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $contribution->save();
   $explorerContribution->contribution()->associate($contribution);
   $explorerContribution->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerContribution;
 }

 public static function editExplorerContribution() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerContributionId = Request::get("explorerContributionId");
  //$contributionId = Request::get("contributionId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerContribution = ExplorerContribution::find($explorerContributionId);
  $explorerContribution->contribution->title = $title;
  $explorerContribution->contribution->description = $description;

  DB::beginTransaction();
  try {
   $explorerContribution->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerContribution;
 }

}
