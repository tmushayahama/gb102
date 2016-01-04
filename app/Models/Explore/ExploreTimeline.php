<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class ExploreTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_timeline';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
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

 public static function getExploreTimelines($exploreId) {
  $exploreTimelines = ExploreTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('explore_id', $exploreId)
    ->get();
  return $exploreTimelines;
 }

 public static function getExploreTimeline($exploreId, $timelineId) {
  $exploreTimeline = ExploreTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('explore_id', $exploreId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $exploreTimeline;
 }

 public static function createExploreTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $exploreTimeline = new ExploreTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $exploreTimeline->explore_id = $exploreId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $exploreTimeline->timeline()->associate($timeline);
   $exploreTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreTimeline;
 }

 public static function editExploreTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreTimelineId = Request::get("exploreTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreTimeline = ExploreTimeline::find($exploreTimelineId);
  $exploreTimeline->timeline->title = $title;
  $exploreTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $exploreTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreTimeline;
 }

}
