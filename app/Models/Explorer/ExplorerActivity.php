<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Activity\Activity;
use Request;
use DB;
use JWTAuth;

class ExplorerActivity extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_activity';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function activity() {
  return $this->belongsTo('App\Models\Activity\Activity', 'activity_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerActivities($explorerId) {
  $explorerActivities = ExplorerActivity::with('activity')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerActivities;
 }

 public static function getExplorerActivity($explorerId, $activityId) {
  $explorerActivity = ExplorerActivity::with('activity')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->where('activity_id', $activityId)
          ->first();
  return $explorerActivity;
 }

 public static function createExplorerActivity() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $activity = new Activity;
  $explorerActivity = new ExplorerActivity;
  $activity->creator_id = $userId;
  $activity->title = $title;
  $activity->description = $description;
  $explorerActivity->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $activity->save();
   $explorerActivity->activity()->associate($activity);
   $explorerActivity->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerActivity;
 }

 public static function editExplorerActivity() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerActivityId = Request::get("explorerActivityId");
  //$activityId = Request::get("activityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerActivity = ExplorerActivity::find($explorerActivityId);
  $explorerActivity->activity->title = $title;
  $explorerActivity->activity->description = $description;

  DB::beginTransaction();
  try {
   $explorerActivity->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerActivity;
 }

}
