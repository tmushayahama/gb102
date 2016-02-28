<?php

namespace App\Models\Swipe;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use App\Models\Explorer\Explorer;
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

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function explorer_modified() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_modified_id');
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

 public static function getAllSwipeAnswers() {
  $swipes = Swipe::orderBy('id', 'desc')
          ->with('explorer')
          ->with('creator')
          ->with('level')
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(50)
          ->get();
  return $swipes;
 }

 public static function getSwipeAnswers($userId) {
  $swipes = Swipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('explorer')
          ->with('creator')
          ->with('level')
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(50)
          ->get();
  return $swipes;
 }

 public static function getSwipe() {
  $howMany = 1;
  $explorerSwipes = (new Collection(
          Explorer::with('icon')
          ->with('creator')
          ->with('level')
          ->with('app_type')
          ->take(500)
          ->get()))
          ->random($howMany);
  return $explorerSwipes;
 }

 public static function createSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $swipe = new Swipe;
  $swipe->creator_id = $userId;
  $swipe->explorer_id = $explorerId;
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
