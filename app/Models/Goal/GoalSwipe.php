<?php

namespace App\Models\Goal;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class GoalSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_goal_swipe';
 public $timestamps = false;

 public function goal() {
  return $this->belongsTo('App\Models\Goal\Goal', 'goal_id');
 }

 public function goal_modified() {
  return $this->belongsTo('App\Models\Goal\Goal', 'goal_modified_id');
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

 public static function getGoalSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalSwipes = GoalSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('goal')
          ->with('creator')
          ->with('goal.creator')
          ->with('goal.icon')
          ->with('goal.level')
          ->take(50)
          ->get();
  return $goalSwipes;
 }

 public static function getGoalSwipe() {
  $howMany = 1;
  $goalSwipes = (new Collection(
          Goal::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $goalSwipes;
 }

 public static function createGoalSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalId = Request::get("goalId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $goalSwipe = new GoalSwipe;
  $goalSwipe->creator_id = $userId;
  $goalSwipe->goal_id = $goalId;
  $goalSwipe->level_id = $level_id;
  $goalSwipe->description = $description;

  DB::beginTransaction();
  try {
   $goalSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalSwipe;
 }

 public static function editGoalSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalSwipeId = Request::get("goalSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $goalSwipe = GoalSwipe::find($goalSwipeId);
  $goalSwipe->swipe->title = $title;
  $goalSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $goalSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalSwipe;
 }

}
