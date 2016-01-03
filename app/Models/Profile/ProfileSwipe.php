<?php

namespace App\Models\Profile;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ProfileSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_profile_swipe';
 public $timestamps = false;

 public function profile() {
  return $this->belongsTo('App\Models\Profile\Profile', 'profile_id');
 }

 public function profile_modified() {
  return $this->belongsTo('App\Models\Profile\Profile', 'profile_modified_id');
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

 public static function getProfileSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileSwipes = ProfileSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('profile')
          ->with('creator')
          ->with('profile.creator')
          ->with('profile.icon')
          ->with('profile.level')
          ->take(50)
          ->get();
  return $profileSwipes;
 }

 public static function getProfileSwipe() {
  $howMany = 1;
  $profileSwipes = (new Collection(
          Profile::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $profileSwipes;
 }

 public static function createProfileSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileId = Request::get("profileId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $profileSwipe = new ProfileSwipe;
  $profileSwipe->creator_id = $userId;
  $profileSwipe->profile_id = $profileId;
  $profileSwipe->level_id = $level_id;
  $profileSwipe->description = $description;

  DB::beginTransaction();
  try {
   $profileSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileSwipe;
 }

 public static function editProfileSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileSwipeId = Request::get("profileSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $profileSwipe = ProfileSwipe::find($profileSwipeId);
  $profileSwipe->swipe->title = $title;
  $profileSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $profileSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileSwipe;
 }

}
