<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class SkillProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill_progress';
 public $timestamps = false;

 public function skill() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_id');
 }

 public function progress() {
  return $this->belongsTo('App\Models\Progress\Progress', 'progress_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getSkillProgress($skillId) {
  $skillProgress = SkillProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->get();
  return $skillProgress;
 }

 public static function getSkillProgress($skillId, $progressId) {
  $skillProgress = SkillProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->where('progress_id', $progressId)
    ->first();
  return $skillProgress;
 }

 public static function createSkillProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $skillProgress = new SkillProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $skillProgress->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $progress->save();
   $skillProgress->progress()->associate($progress);
   $skillProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillProgress;
 }

 public static function editSkillProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillProgressId = Request::get("skillProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $skillProgress = SkillProgress::find($skillProgressId);
  $skillProgress->progress->title = $title;
  $skillProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $skillProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillProgress;
 }

}
