<?php

namespace App\Models\Swipe;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Models\Explore\Explore;
use Request;
use DB;
use JWTAuth;

class Swipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_swipe';
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

 public static function getSwipeHistory() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipes = Swipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('explore')
          ->with('creator')
          ->with('level')
          ->with('explore.app_type')
          ->with('explore.creator')
          ->with('explore.icon')
          ->with('explore.level')
          ->take(50)
          ->get();
  return $swipes;
 }

 public static function getSwipe() {
  $howMany = 1;
  $exploreSwipes = (new Collection(
          Explore::with('icon')
          ->with('creator')
          ->with('level')
          ->with('app_type')
          ->take(500)
          ->get()))
          ->random($howMany);
  return $exploreSwipes;
 }

 public static function createSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $swipe = new Swipe;
  $swipe->creator_id = $userId;
  $swipe->explore_id = $exploreId;
  $swipe->level_id = $level_id;
  $swipe->description = $description;

  DB::beginTransaction();
  try {
   $swipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipe;
 }

 public static function editSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeId = Request::get("swipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $swipe = Swipe::find($swipeId);
  $swipe->swipe->title = $title;
  $swipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $swipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipe;
 }

}
