<?php

namespace App\Models\Goal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class GoalProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_goal_progress';
 public $timestamps = false;

 public function goal() {
  return $this->belongsTo('App\Models\Goal\Goal', 'goal_id');
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

 public static function getGoalProgress($goalId) {
  $goalProgress = GoalProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->get();
  return $goalProgress;
 }

 public static function getGoalProgress($goalId, $progressId) {
  $goalProgress = GoalProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->where('progress_id', $progressId)
    ->first();
  return $goalProgress;
 }

 public static function createGoalProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalId = Request::get("goalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $goalProgress = new GoalProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $goalProgress->goal_id = $goalId;

  DB::beginTransaction();
  try {
   $progress->save();
   $goalProgress->progress()->associate($progress);
   $goalProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalProgress;
 }

 public static function editGoalProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalProgressId = Request::get("goalProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $goalProgress = GoalProgress::find($goalProgressId);
  $goalProgress->progress->title = $title;
  $goalProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $goalProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalProgress;
 }

}
