<?php

namespace App\Models\Swipe;

use Illuminate\Database\Eloquent\Model;
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

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function icon() {
  return $this->belongsTo('App\Models\Icon\Icon', 'icon_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getSwipesAll() {
  $swipes = Swipe::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $swipes;
 }

 public static function getSwipesMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipes = Swipe::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $swipes;
 }

 public static function getSwipe($id) {
  $swipe = Swipe::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $swipe; //$swipe;
 }

 public static function createSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $swipe = new Swipe;
  $swipe->creator_id = $userId;
  $swipe->title = $title;
  $swipe->description = $description;
  $swipe->level_id = $levelId;

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
  $title = Request::get("title");
  $description = Request::get("description");
  $swipe = Swipe::find($swipeId);
  $swipe->title = $title;
  $swipe->description = $description;

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
