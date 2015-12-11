<?php

namespace App\Models\Goal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class GoalTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_goal_timeline';
 public $timestamps = false;

 public function goal() {
  return $this->belongsTo('App\Models\Goal\Goal', 'goal_id');
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

 public static function getGoalTimelines($goalId) {
  $goalTimelines = GoalTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->get();
  return $goalTimelines;
 }

 public static function getGoalTimeline($goalId, $timelineId) {
  $goalTimeline = GoalTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $goalTimeline;
 }

 public static function createGoalTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalId = Request::get("goalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $goalTimeline = new GoalTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $goalTimeline->goal_id = $goalId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $goalTimeline->timeline()->associate($timeline);
   $goalTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalTimeline;
 }

 public static function editGoalTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalTimelineId = Request::get("goalTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $goalTimeline = GoalTimeline::find($goalTimelineId);
  $goalTimeline->timeline->title = $title;
  $goalTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $goalTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalTimeline;
 }

}
