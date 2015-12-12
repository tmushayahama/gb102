<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class MentorshipTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_timeline';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
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

 public static function getMentorshipTimelines($mentorshipId) {
  $mentorshipTimelines = MentorshipTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->get();
  return $mentorshipTimelines;
 }

 public static function getMentorshipTimeline($mentorshipId, $timelineId) {
  $mentorshipTimeline = MentorshipTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $mentorshipTimeline;
 }

 public static function createMentorshipTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $mentorshipTimeline = new MentorshipTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $mentorshipTimeline->mentorship_id = $mentorshipId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $mentorshipTimeline->timeline()->associate($timeline);
   $mentorshipTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipTimeline;
 }

 public static function editMentorshipTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipTimelineId = Request::get("mentorshipTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipTimeline = MentorshipTimeline::find($mentorshipTimelineId);
  $mentorshipTimeline->timeline->title = $title;
  $mentorshipTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipTimeline;
 }

}
