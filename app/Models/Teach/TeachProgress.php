<?php

namespace App\Models\Teach;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class TeachProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_teach_progress';
 public $timestamps = false;

 public function teach() {
  return $this->belongsTo('App\Models\Teach\Teach', 'teach_id');
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

 public static function getTeachProgress($teachId) {
  $teachProgress = TeachProgress::with('progress')
          ->with('progress.creator')
          ->orderBy('id', 'DESC')
          ->where('teach_id', $teachId)
          ->get();
  return $teachProgress;
 }

 public static function getTeachProgressItem($teachId, $progressId) {
  $teachProgress = TeachProgress::with('progress')
          ->orderBy('id', 'DESC')
          ->where('teach_id', $teachId)
          ->where('progress_id', $progressId)
          ->first();
  return $teachProgress;
 }

 public static function createTeachProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachId = Request::get("teachId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $teachProgress = new TeachProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $teachProgress->teach_id = $teachId;

  DB::beginTransaction();
  try {
   $progress->save();
   $teachProgress->progress()->associate($progress);
   $teachProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachProgress;
 }

 public static function editTeachProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachProgressId = Request::get("teachProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $teachProgress = TeachProgress::find($teachProgressId);
  $teachProgress->progress->title = $title;
  $teachProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $teachProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachProgress;
 }

}
