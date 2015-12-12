<?php

namespace App\Models\Hobby;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class HobbyTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_hobby_timeline';
 public $timestamps = false;

 public function hobby() {
  return $this->belongsTo('App\Models\Hobby\Hobby', 'hobby_id');
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

 public static function getHobbyTimelines($hobbyId) {
  $hobbyTimelines = HobbyTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->get();
  return $hobbyTimelines;
 }

 public static function getHobbyTimeline($hobbyId, $timelineId) {
  $hobbyTimeline = HobbyTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $hobbyTimeline;
 }

 public static function createHobbyTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyId = Request::get("hobbyId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $hobbyTimeline = new HobbyTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $hobbyTimeline->hobby_id = $hobbyId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $hobbyTimeline->timeline()->associate($timeline);
   $hobbyTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyTimeline;
 }

 public static function editHobbyTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyTimelineId = Request::get("hobbyTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $hobbyTimeline = HobbyTimeline::find($hobbyTimelineId);
  $hobbyTimeline->timeline->title = $title;
  $hobbyTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $hobbyTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyTimeline;
 }

}
