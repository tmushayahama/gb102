<?php

namespace App\Models\Teach;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class TeachTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_teach_timeline';
 public $timestamps = false;

 public function teach() {
  return $this->belongsTo('App\Models\Teach\Teach', 'teach_id');
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

 public static function getTeachTimelines($teachId) {
  $teachTimelines = TeachTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->get();
  return $teachTimelines;
 }

 public static function getTeachTimeline($teachId, $timelineId) {
  $teachTimeline = TeachTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $teachTimeline;
 }

 public static function createTeachTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachId = Request::get("teachId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $teachTimeline = new TeachTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $teachTimeline->teach_id = $teachId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $teachTimeline->timeline()->associate($timeline);
   $teachTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachTimeline;
 }

 public static function editTeachTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachTimelineId = Request::get("teachTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $teachTimeline = TeachTimeline::find($teachTimelineId);
  $teachTimeline->timeline->title = $title;
  $teachTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $teachTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachTimeline;
 }

}
