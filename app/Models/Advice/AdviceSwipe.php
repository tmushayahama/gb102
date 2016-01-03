<?php

namespace App\Models\Advice;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class AdviceSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_advice_swipe';
 public $timestamps = false;

 public function advice() {
  return $this->belongsTo('App\Models\Advice\Advice', 'advice_id');
 }

 public function advice_modified() {
  return $this->belongsTo('App\Models\Advice\Advice', 'advice_modified_id');
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

 public static function getAdviceSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceSwipes = AdviceSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('advice')
          ->with('creator')
          ->with('advice.creator')
          ->with('advice.icon')
          ->with('advice.level')
          ->take(50)
          ->get();
  return $adviceSwipes;
 }

 public static function getAdviceSwipe() {
  $howMany = 1;
  $adviceSwipes = (new Collection(
          Advice::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $adviceSwipes;
 }

 public static function createAdviceSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceId = Request::get("adviceId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $adviceSwipe = new AdviceSwipe;
  $adviceSwipe->creator_id = $userId;
  $adviceSwipe->advice_id = $adviceId;
  $adviceSwipe->level_id = $level_id;
  $adviceSwipe->description = $description;

  DB::beginTransaction();
  try {
   $adviceSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceSwipe;
 }

 public static function editAdviceSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceSwipeId = Request::get("adviceSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $adviceSwipe = AdviceSwipe::find($adviceSwipeId);
  $adviceSwipe->swipe->title = $title;
  $adviceSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $adviceSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceSwipe;
 }

}
