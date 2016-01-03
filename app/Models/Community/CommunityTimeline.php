<?php

namespace App\Models\Community;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class CommunityTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_community_timeline';
 public $timestamps = false;

 public function community() {
  return $this->belongsTo('App\Models\Community\Community', 'community_id');
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

 public static function getCommunityTimelines($communityId) {
  $communityTimelines = CommunityTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->get();
  return $communityTimelines;
 }

 public static function getCommunityTimeline($communityId, $timelineId) {
  $communityTimeline = CommunityTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $communityTimeline;
 }

 public static function createCommunityTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityId = Request::get("communityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $communityTimeline = new CommunityTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $communityTimeline->community_id = $communityId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $communityTimeline->timeline()->associate($timeline);
   $communityTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityTimeline;
 }

 public static function editCommunityTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityTimelineId = Request::get("communityTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $communityTimeline = CommunityTimeline::find($communityTimelineId);
  $communityTimeline->timeline->title = $title;
  $communityTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $communityTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityTimeline;
 }

}
