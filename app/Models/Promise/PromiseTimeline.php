<?php

namespace App\Models\Promise;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class PromiseTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_promise_timeline';
 public $timestamps = false;

 public function promise() {
  return $this->belongsTo('App\Models\Promise\Promise', 'promise_id');
 }

 public function timeline() {
  return $this->belongsTo('App\Models\Timeline\Timeline', 'timeline_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getPromiseTimelines($promiseId) {
  $promiseTimelines = PromiseTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->get();
  return $promiseTimelines;
 }

 public static function getPromiseTimeline($promiseId, $timelineId) {
  $promiseTimeline = PromiseTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $promiseTimeline;
 }

 public static function createPromiseTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseId = Request::get("promiseId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $promiseTimeline = new PromiseTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $promiseTimeline->promise_id = $promiseId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $promiseTimeline->timeline()->associate($timeline);
   $promiseTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseTimeline;
 }

 public static function editPromiseTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseTimelineId = Request::get("promiseTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $promiseTimeline = PromiseTimeline::find($promiseTimelineId);
  $promiseTimeline->timeline->title = $title;
  $promiseTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $promiseTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseTimeline;
 }

}
