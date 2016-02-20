<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use App\Models\Contributor\Contributor;
use Request;
use DB;
use JWTAuth;

class ExploreContributor extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_contributor';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
 }

 public function contributor() {
  return $this->belongsTo('App\Models\Contributor\Contributor', 'contributor_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExploreContributors($exploreId) {
  $exploreContributors = ExploreContributor::with('contributor')
          ->with('contributor.creator')
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->get();
  return $exploreContributors;
 }

 public static function getExploreContributor($exploreId, $contributorId) {
  $exploreContributor = ExploreContributor::with('contributor')
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->where('contributor_id', $contributorId)
          ->first();
  return $exploreContributor;
 }

 public static function createExploreContributor() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $title = Request::get("title");
  $description = Request::get("description");
  $contributor = new Contributor;
  $exploreContributor = new ExploreContributor;
  $contributor->creator_id = $userId;
  $contributor->title = $title;
  $exploreContributor->explore_id = $exploreId;

  DB::beginTransaction();
  try {
   $contributor->save();
   $exploreContributor->contributor()->associate($contributor);
   $exploreContributor->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreContributor;
 }

 public static function editExploreContributor() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreContributorId = Request::get("exploreContributorId");
  //$contributorId = Request::get("contributorId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreContributor = ExploreContributor::find($exploreContributorId);
  $exploreContributor->contributor->title = $title;
  $exploreContributor->contributor->description = $description;

  DB::beginTransaction();
  try {
   $exploreContributor->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreContributor;
 }

}
