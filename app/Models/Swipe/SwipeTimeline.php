<?php

namespace App\Models\Swipe;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class SwipeTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_swipe_timeline';
 public $timestamps = false;

 public function swipe() {
  return $this->belongsTo('App\Models\Swipe\Swipe', 'swipe_id');
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

 public static function getSwipeTimelines($swipeId) {
  $swipeTimelines = SwipeTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->get();
  return $swipeTimelines;
 }

 public static function getSwipeTimeline($swipeId, $timelineId) {
  $swipeTimeline = SwipeTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $swipeTimeline;
 }

 public static function createSwipeTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $swipeTimeline = new SwipeTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $swipeTimeline->swipe_id = $swipeId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $swipeTimeline->timeline()->associate($timeline);
   $swipeTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeTimeline;
 }

 public static function editSwipeTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeTimelineId = Request::get("swipeTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $swipeTimeline = SwipeTimeline::find($swipeTimelineId);
  $swipeTimeline->timeline->title = $title;
  $swipeTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $swipeTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeTimeline;
 }

}
