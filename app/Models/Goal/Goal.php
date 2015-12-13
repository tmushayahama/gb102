<?php

namespace App\Models\Goal;

use Illuminate\Database\Eloquent\Model;
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
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getGoals() {
  $goals = Goal::orderBy('id', 'desc')
    ->with('creator')
    ->with('level')
    ->take(10)
    ->get();
  return $goals;
 }

 public static function getGoal($id) {
  $goal = Goal::with('creator')
    ->with('level')
    ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $goal; //$goal;
 }

 public static function createGoal() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $goal = new Goal;
  $goal->creator_id = $userId;
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

}