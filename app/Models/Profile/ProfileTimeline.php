<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class ProfileTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_profile_timeline';
 public $timestamps = false;

 public function profile() {
  return $this->belongsTo('App\Models\Profile\Profile', 'profile_id');
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

 public static function getProfileTimelines($profileId) {
  $profileTimelines = ProfileTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->get();
  return $profileTimelines;
 }

 public static function getProfileTimeline($profileId, $timelineId) {
  $profileTimeline = ProfileTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $profileTimeline;
 }

 public static function createProfileTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileId = Request::get("profileId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $profileTimeline = new ProfileTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $profileTimeline->profile_id = $profileId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $profileTimeline->timeline()->associate($timeline);
   $profileTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileTimeline;
 }

 public static function editProfileTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileTimelineId = Request::get("profileTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $profileTimeline = ProfileTimeline::find($profileTimelineId);
  $profileTimeline->timeline->title = $title;
  $profileTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $profileTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileTimeline;
 }

}
