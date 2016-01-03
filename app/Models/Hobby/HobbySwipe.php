<?php

namespace App\Models\Hobby;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class HobbySwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_hobby_swipe';
 public $timestamps = false;

 public function hobby() {
  return $this->belongsTo('App\Models\Hobby\Hobby', 'hobby_id');
 }

 public function hobby_modified() {
  return $this->belongsTo('App\Models\Hobby\Hobby', 'hobby_modified_id');
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

 public static function getHobbySwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbySwipes = HobbySwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('hobby')
          ->with('creator')
          ->with('hobby.creator')
          ->with('hobby.icon')
          ->with('hobby.level')
          ->take(50)
          ->get();
  return $hobbySwipes;
 }

 public static function getHobbySwipe() {
  $howMany = 1;
  $hobbySwipes = (new Collection(
          Hobby::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $hobbySwipes;
 }

 public static function createHobbySwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyId = Request::get("hobbyId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $hobbySwipe = new HobbySwipe;
  $hobbySwipe->creator_id = $userId;
  $hobbySwipe->hobby_id = $hobbyId;
  $hobbySwipe->level_id = $level_id;
  $hobbySwipe->description = $description;

  DB::beginTransaction();
  try {
   $hobbySwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbySwipe;
 }

 public static function editHobbySwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbySwipeId = Request::get("hobbySwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $hobbySwipe = HobbySwipe::find($hobbySwipeId);
  $hobbySwipe->swipe->title = $title;
  $hobbySwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $hobbySwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbySwipe;
 }

}
