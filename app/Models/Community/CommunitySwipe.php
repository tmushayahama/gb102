<?php

namespace App\Models\Community;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class CommunitySwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_community_swipe';
 public $timestamps = false;

 public function community() {
  return $this->belongsTo('App\Models\Community\Community', 'community_id');
 }

 public function community_modified() {
  return $this->belongsTo('App\Models\Community\Community', 'community_modified_id');
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

 public static function getCommunitySwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communitySwipes = CommunitySwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('community')
          ->with('creator')
          ->with('community.creator')
          ->with('community.icon')
          ->with('community.level')
          ->take(50)
          ->get();
  return $communitySwipes;
 }

 public static function getCommunitySwipe() {
  $howMany = 1;
  $communitySwipes = (new Collection(
          Community::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $communitySwipes;
 }

 public static function createCommunitySwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityId = Request::get("communityId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $communitySwipe = new CommunitySwipe;
  $communitySwipe->creator_id = $userId;
  $communitySwipe->community_id = $communityId;
  $communitySwipe->level_id = $level_id;
  $communitySwipe->description = $description;

  DB::beginTransaction();
  try {
   $communitySwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communitySwipe;
 }

 public static function editCommunitySwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communitySwipeId = Request::get("communitySwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $communitySwipe = CommunitySwipe::find($communitySwipeId);
  $communitySwipe->swipe->title = $title;
  $communitySwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $communitySwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communitySwipe;
 }

}
