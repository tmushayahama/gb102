<?php

namespace App\Models\Collaboration;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class CollaborationTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration_timeline';
 public $timestamps = false;

 public function collaboration() {
  return $this->belongsTo('App\Models\Collaboration\Collaboration', 'collaboration_id');
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

 public static function getCollaborationTimelines($collaborationId) {
  $collaborationTimelines = CollaborationTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->get();
  return $collaborationTimelines;
 }

 public static function getCollaborationTimeline($collaborationId, $timelineId) {
  $collaborationTimeline = CollaborationTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $collaborationTimeline;
 }

 public static function createCollaborationTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $collaborationTimeline = new CollaborationTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $collaborationTimeline->collaboration_id = $collaborationId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $collaborationTimeline->timeline()->associate($timeline);
   $collaborationTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationTimeline;
 }

 public static function editCollaborationTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationTimelineId = Request::get("collaborationTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaborationTimeline = CollaborationTimeline::find($collaborationTimelineId);
  $collaborationTimeline->timeline->title = $title;
  $collaborationTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $collaborationTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationTimeline;
 }

}
