<?php

namespace App\Models\Swipe;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class SwipeProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_swipe_progress';
 public $timestamps = false;

 public function swipe() {
  return $this->belongsTo('App\Models\Swipe\Swipe', 'swipe_id');
 }

 public function progress() {
  return $this->belongsTo('App\Models\Progress\Progress', 'progress_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getSwipeProgress($swipeId) {
  $swipeProgress = SwipeProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->get();
  return $swipeProgress;
 }

 public static function getSwipeProgress($swipeId, $progressId) {
  $swipeProgress = SwipeProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->where('progress_id', $progressId)
    ->first();
  return $swipeProgress;
 }

 public static function createSwipeProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $swipeProgress = new SwipeProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $swipeProgress->swipe_id = $swipeId;

  DB::beginTransaction();
  try {
   $progress->save();
   $swipeProgress->progress()->associate($progress);
   $swipeProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeProgress;
 }

 public static function editSwipeProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeProgressId = Request::get("swipeProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $swipeProgress = SwipeProgress::find($swipeProgressId);
  $swipeProgress->progress->title = $title;
  $swipeProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $swipeProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeProgress;
 }

}
