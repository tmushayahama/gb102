<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class ProjectTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_project_timeline';
 public $timestamps = false;

 public function project() {
  return $this->belongsTo('App\Models\Project\Project', 'project_id');
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

 public static function getProjectTimelines($projectId) {
  $projectTimelines = ProjectTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->get();
  return $projectTimelines;
 }

 public static function getProjectTimeline($projectId, $timelineId) {
  $projectTimeline = ProjectTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $projectTimeline;
 }

 public static function createProjectTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectId = Request::get("projectId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $projectTimeline = new ProjectTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $projectTimeline->project_id = $projectId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $projectTimeline->timeline()->associate($timeline);
   $projectTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectTimeline;
 }

 public static function editProjectTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectTimelineId = Request::get("projectTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $projectTimeline = ProjectTimeline::find($projectTimelineId);
  $projectTimeline->timeline->title = $title;
  $projectTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $projectTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectTimeline;
 }

}
