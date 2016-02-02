<?php

namespace App\Models\Advice;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class AdviceTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_advice_timeline';
 public $timestamps = false;

 public function advice() {
  return $this->belongsTo('App\Models\Advice\Advice', 'advice_id');
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

 public static function getAdviceTimelines($adviceId) {
  $adviceTimelines = AdviceTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->get();
  return $adviceTimelines;
 }

 public static function getAdviceTimeline($adviceId, $timelineId) {
  $adviceTimeline = AdviceTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $adviceTimeline;
 }

 public static function createAdviceTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceId = Request::get("adviceId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $adviceTimeline = new AdviceTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $adviceTimeline->advice_id = $adviceId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $adviceTimeline->timeline()->associate($timeline);
   $adviceTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceTimeline;
 }

 public static function editAdviceTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceTimelineId = Request::get("adviceTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $adviceTimeline = AdviceTimeline::find($adviceTimelineId);
  $adviceTimeline->timeline->title = $title;
  $adviceTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $adviceTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceTimeline;
 }

}
