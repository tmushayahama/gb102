<?php

namespace App\Models\Goal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class GoalWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_goal_weblink';
 public $timestamps = false;

 public function goal() {
  return $this->belongsTo('App\Models\Goal\Goal', 'goal_id');
 }

 public function weblink() {
  return $this->belongsTo('App\Models\Weblink\Weblink', 'weblink_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getGoalWeblinks($goalId) {
  $goalWeblinks = GoalWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->get();
  return $goalWeblinks;
 }

 public static function getGoalWeblink($goalId, $weblinkId) {
  $goalWeblink = GoalWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $goalWeblink;
 }

 public static function createGoalWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalId = Request::get("goalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $goalWeblink = new GoalWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $goalWeblink->goal_id = $goalId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $goalWeblink->weblink()->associate($weblink);
   $goalWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalWeblink;
 }

 public static function editGoalWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalWeblinkId = Request::get("goalWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $goalWeblink = GoalWeblink::find($goalWeblinkId);
  $goalWeblink->weblink->title = $title;
  $goalWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $goalWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalWeblink;
 }

}
