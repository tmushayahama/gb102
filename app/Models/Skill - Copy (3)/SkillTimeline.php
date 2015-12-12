<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class SkillTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill_timeline';
 public $timestamps = false;

 public function skill() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_id');
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

 public static function getSkillTimelines($skillId) {
  $skillTimelines = SkillTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->get();
  return $skillTimelines;
 }

 public static function getSkillTimeline($skillId, $timelineId) {
  $skillTimeline = SkillTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $skillTimeline;
 }

 public static function createSkillTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $skillTimeline = new SkillTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $skillTimeline->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $skillTimeline->timeline()->associate($timeline);
   $skillTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillTimeline;
 }

 public static function editSkillTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillTimelineId = Request::get("skillTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $skillTimeline = SkillTimeline::find($skillTimelineId);
  $skillTimeline->timeline->title = $title;
  $skillTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $skillTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillTimeline;
 }

}
