<?php

namespace App\Models\Explore;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ExploreSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_swipe';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
 }

 public function explore_modified() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_modified_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExploreSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreSwipes = ExploreSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('explore')
          ->with('creator')
          ->with('explore.creator')
          ->with('explore.icon')
          ->with('explore.level')
          ->take(50)
          ->get();
  return $exploreSwipes;
 }

 public static function getExploreSwipe() {
  $howMany = 1;
  $exploreSwipes = (new Collection(
          Explore::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $exploreSwipes;
 }

 public static function createExploreSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $exploreSwipe = new ExploreSwipe;
  $exploreSwipe->creator_id = $userId;
  $exploreSwipe->explore_id = $exploreId;
  $exploreSwipe->level_id = $level_id;
  $exploreSwipe->description = $description;

  DB::beginTransaction();
  try {
   $exploreSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreSwipe;
 }

 public static function editExploreSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreSwipeId = Request::get("exploreSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreSwipe = ExploreSwipe::find($exploreSwipeId);
  $exploreSwipe->swipe->title = $title;
  $exploreSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $exploreSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreSwipe;
 }

}
