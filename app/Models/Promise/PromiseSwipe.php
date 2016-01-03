<?php

namespace App\Models\Promise;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class PromiseSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_promise_swipe';
 public $timestamps = false;

 public function promise() {
  return $this->belongsTo('App\Models\Promise\Promise', 'promise_id');
 }

 public function promise_modified() {
  return $this->belongsTo('App\Models\Promise\Promise', 'promise_modified_id');
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

 public static function getPromiseSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseSwipes = PromiseSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('promise')
          ->with('creator')
          ->with('promise.creator')
          ->with('promise.icon')
          ->with('promise.level')
          ->take(50)
          ->get();
  return $promiseSwipes;
 }

 public static function getPromiseSwipe() {
  $howMany = 1;
  $promiseSwipes = (new Collection(
          Promise::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $promiseSwipes;
 }

 public static function createPromiseSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseId = Request::get("promiseId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $promiseSwipe = new PromiseSwipe;
  $promiseSwipe->creator_id = $userId;
  $promiseSwipe->promise_id = $promiseId;
  $promiseSwipe->level_id = $level_id;
  $promiseSwipe->description = $description;

  DB::beginTransaction();
  try {
   $promiseSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseSwipe;
 }

 public static function editPromiseSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseSwipeId = Request::get("promiseSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $promiseSwipe = PromiseSwipe::find($promiseSwipeId);
  $promiseSwipe->swipe->title = $title;
  $promiseSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $promiseSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseSwipe;
 }

}
