<?php

namespace App\Models\Teach;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class TeachSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_teach_swipe';
 public $timestamps = false;

 public function teach() {
  return $this->belongsTo('App\Models\Teach\Teach', 'teach_id');
 }

 public function teach_modified() {
  return $this->belongsTo('App\Models\Teach\Teach', 'teach_modified_id');
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

 public static function getTeachSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachSwipes = TeachSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('teach')
          ->with('creator')
          ->with('teach.creator')
          ->with('teach.icon')
          ->with('teach.level')
          ->take(50)
          ->get();
  return $teachSwipes;
 }

 public static function getTeachSwipe() {
  $howMany = 1;
  $teachSwipes = (new Collection(
          Teach::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $teachSwipes;
 }

 public static function createTeachSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachId = Request::get("teachId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $teachSwipe = new TeachSwipe;
  $teachSwipe->creator_id = $userId;
  $teachSwipe->teach_id = $teachId;
  $teachSwipe->level_id = $level_id;
  $teachSwipe->description = $description;

  DB::beginTransaction();
  try {
   $teachSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachSwipe;
 }

 public static function editTeachSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachSwipeId = Request::get("teachSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $teachSwipe = TeachSwipe::find($teachSwipeId);
  $teachSwipe->swipe->title = $title;
  $teachSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $teachSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachSwipe;
 }

}
