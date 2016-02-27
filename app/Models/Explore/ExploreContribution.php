<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use App\Models\Contribution\Contribution;
use Request;
use DB;
use JWTAuth;

class ExploreContribution extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_contribution';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
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

 public static function getExploreContributions($exploreId) {
  $exploreContributions = ExploreContribution::with('contribution')
          ->with('contribution.creator')
          ->with('contribution.contributor')
          ->with('contribution.level')
          ->with('contribution.status')
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->get();
  return $exploreContributions;
 }

 public static function getExploreContribution($exploreId, $contributionId) {
  $exploreContribution = ExploreContribution::with('contribution')
          ->where('explore_id', $exploreId)
          ->where('contribution_id', $contributionId)
          ->first();
  return $exploreContribution->level->name;
 }

 public static function getExploreContributionLevel($exploreId, $contributionId) {
  $exploreContribution = ExploreContribution::with('contribution')
          ->where('explore_id', $exploreId)
          ->where('contribution_id', $contributionId)
          ->with('contribution.level')
          ->first();
  if ($exploreContribution != null) {
   return $exploreContribution;
  }
  return null;
 }

 public static function createExploreContribution() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("explore_id");
  $description = Request::get("description");
  $levelId = Request::get("level_id");
  $contributorId = Request::get("contributor_id");
  $contribution = new Contribution;
  $exploreContribution = new ExploreContribution;

  $contribution->creator_id = $userId;
  $contribution->contributor_id = $contributorId;
  $contribution->description = $description;
  $contribution->level_id = $levelId;
  $exploreContribution->explore_id = $exploreId;

  DB::beginTransaction();
  try {
   $contribution->save();
   $exploreContribution->contribution()->associate($contribution);
   $exploreContribution->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreContribution;
 }

 public static function editExploreContribution() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreContributionId = Request::get("exploreContributionId");
  //$contributionId = Request::get("contributionId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreContribution = ExploreContribution::find($exploreContributionId);
  $exploreContribution->contribution->title = $title;
  $exploreContribution->contribution->description = $description;

  DB::beginTransaction();
  try {
   $exploreContribution->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreContribution;
 }

}
