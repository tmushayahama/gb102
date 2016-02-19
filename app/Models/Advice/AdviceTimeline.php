<?php

namespace App\Models\Advice;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class AdviceProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_advice_progress';
 public $timestamps = false;

 public function advice() {
  return $this->belongsTo('App\Models\Advice\Advice', 'advice_id');
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

 public static function getAdviceProgress($adviceId) {
  $adviceProgress = AdviceProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->get();
  return $adviceProgress;
 }

 public static function getAdviceProgress($adviceId, $progressId) {
  $adviceProgress = AdviceProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->where('progress_id', $progressId)
    ->first();
  return $adviceProgress;
 }

 public static function createAdviceProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceId = Request::get("adviceId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $adviceProgress = new AdviceProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $adviceProgress->advice_id = $adviceId;

  DB::beginTransaction();
  try {
   $progress->save();
   $adviceProgress->progress()->associate($progress);
   $adviceProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceProgress;
 }

 public static function editAdviceProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceProgressId = Request::get("adviceProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $adviceProgress = AdviceProgress::find($adviceProgressId);
  $adviceProgress->progress->title = $title;
  $adviceProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $adviceProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceProgress;
 }

}
