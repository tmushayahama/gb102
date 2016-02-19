<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class ExploreProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_progress';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
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

 public static function getExploreProgress($exploreId) {
  $exploreProgress = ExploreProgress::with('progress')
          ->with('progress.creator')
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->get();
  return $exploreProgress;
 }

 public static function getExploreProgressItem($exploreId, $progressId) {
  $exploreProgress = ExploreProgress::with('progress')
          ->orderBy('id', 'DESC')
          ->where('explore_id', $exploreId)
          ->where('progress_id', $progressId)
          ->first();
  return $exploreProgress;
 }

 public static function createExploreProgressItem() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $exploreProgress = new ExploreProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $exploreProgress->explore_id = $exploreId;

  DB::beginTransaction();
  try {
   $progress->save();
   $exploreProgress->progress()->associate($progress);
   $exploreProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreProgress;
 }

 public static function editExploreProgressItem() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreProgressId = Request::get("exploreProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreProgress = ExploreProgress::find($exploreProgressId);
  $exploreProgress->progress->title = $title;
  $exploreProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $exploreProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreProgress;
 }

}
