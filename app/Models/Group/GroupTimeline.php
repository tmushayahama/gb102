<?php

namespace App\Models\Group;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class GroupTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_group_timeline';
 public $timestamps = false;

 public function group() {
  return $this->belongsTo('App\Models\Group\Group', 'group_id');
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

 public static function getGroupTimelines($groupId) {
  $groupTimelines = GroupTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->get();
  return $groupTimelines;
 }

 public static function getGroupTimeline($groupId, $timelineId) {
  $groupTimeline = GroupTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $groupTimeline;
 }

 public static function createGroupTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupId = Request::get("groupId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $groupTimeline = new GroupTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $groupTimeline->group_id = $groupId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $groupTimeline->timeline()->associate($timeline);
   $groupTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupTimeline;
 }

 public static function editGroupTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupTimelineId = Request::get("groupTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $groupTimeline = GroupTimeline::find($groupTimelineId);
  $groupTimeline->timeline->title = $title;
  $groupTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $groupTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupTimeline;
 }

}
