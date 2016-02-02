<?php

namespace App\Models\Goal;

use Illuminate\Database\Eloquent\Model;
use App\Models\AppType\AppType;
use Request;
use DB;
use JWTAuth;

class Goal extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_goal';
 public $count = 41;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'mentor_id');
 }

 public function mentor() {
  return $this->belongsTo('App\Models\User\User', 'mentor_id');
 }

 public function mentee() {
  return $this->belongsTo('App\Models\User\User', 'mentee_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getGoalsAll() {
  $goals = Goal::orderBy('id', 'desc')
          ->with('explore')
          ->whereHas('explore', function($q) {
           $q->whereNull('parent_explore_id');
          })
          ->with('explore.app_type')
          ->with('explore.creator')
          ->with('explore.icon')
          ->with('explore.level')
          ->take(100)
          ->get();
  return $goals;
 }

 public static function getSubGoals($goalId) {
  $goals = Goal::orderBy('id', 'desc')
          ->with('explore')
          ->with('mentor')
          ->with('mentee')
          ->whereHas('explore', function($q) use ($goalId) {
           $q->where('parent_explore_id', $goalId);
          })
          ->with('explore.app_type')
          ->with('explore.creator')
          ->with('explore.icon')
          ->with('explore.level')
          ->take(100)
          ->get();
  return $goals;
 }

 public static function getGoals($appName) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $goals = Goal::where('app_type_id', $appId->id)
           ->orderBy('id', 'desc')
           ->with('explore')
           ->with('explore.app_type')
           ->with('explore.creator')
           ->with('explore.icon')
           ->with('explore.level')
           ->take(100)
           ->get();
  }
  return $goals;
 }

 public static function getGoalsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goals = Goal::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $goals;
 }

 public static function getGoal($id) {
  $goal = Goal::with('creator')
          ->with('mentor')
          ->with('mentee')
          ->with('explore')
          ->with('explore.app_type')
          ->with('explore.creator')
          ->with('explore.icon')
          ->with('explore.level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $goal; //$goal;
 }

 public static function createGoal() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("appTypeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $goal = new Goal;
  $goal->creator_id = $userId;
  $goal->app_type_id = $appTypeId;
  $goal->title = $title;
  $goal->description = $description;
  $goal->level_id = $levelId;

  DB::beginTransaction();
  try {
   $goal->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goal;
 }

 public static function editGoal() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalId = Request::get("goalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $goal = Goal::find($goalId);
  $goal->title = $title;
  $goal->description = $description;

  DB::beginTransaction();
  try {
   $goal->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goal;
 }

 public function scopeSearchByKeyword($query, $keyword) {
  if ($keyword != '') {
   $query->where(function ($query) use ($keyword) {
    $query->where("title", "LIKE", "%$keyword%")
            ->orWhere("description", "LIKE", "%$keyword%");
   });
  }
  return $query;
 }

}
