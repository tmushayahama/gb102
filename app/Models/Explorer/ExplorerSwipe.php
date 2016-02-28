<?php

namespace App\Models\Explorer;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ExplorerSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_swipe';
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

 public static function getExplorerSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerSwipes = ExplorerSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('explorer')
          ->with('creator')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(50)
          ->get();
  return $explorerSwipes;
 }

 public static function getExplorerSwipe() {
  $howMany = 1;
  $explorerSwipes = (new Collection(
          Explorer::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $explorerSwipes;
 }

 public static function createExplorerSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $explorerSwipe = new ExplorerSwipe;
  $explorerSwipe->creator_id = $userId;
  $explorerSwipe->explorer_id = $explorerId;
  $explorerSwipe->level_id = $level_id;
  $explorerSwipe->description = $description;

  DB::beginTransaction();
  try {
   $explorerSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerSwipe;
 }

 public static function editExplorerSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerSwipeId = Request::get("explorerSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerSwipe = ExplorerSwipe::find($explorerSwipeId);
  $explorerSwipe->swipe->title = $title;
  $explorerSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $explorerSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerSwipe;
 }

}
