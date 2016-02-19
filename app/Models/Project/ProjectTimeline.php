<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class ProjectProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_project_progress';
 public $timestamps = false;

 public function project() {
  return $this->belongsTo('App\Models\Project\Project', 'project_id');
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

 public static function getProjectProgress($projectId) {
  $projectProgress = ProjectProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->get();
  return $projectProgress;
 }

 public static function getProjectProgress($projectId, $progressId) {
  $projectProgress = ProjectProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->where('progress_id', $progressId)
    ->first();
  return $projectProgress;
 }

 public static function createProjectProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectId = Request::get("projectId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $projectProgress = new ProjectProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $projectProgress->project_id = $projectId;

  DB::beginTransaction();
  try {
   $progress->save();
   $projectProgress->progress()->associate($progress);
   $projectProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectProgress;
 }

 public static function editProjectProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectProgressId = Request::get("projectProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $projectProgress = ProjectProgress::find($projectProgressId);
  $projectProgress->progress->title = $title;
  $projectProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $projectProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectProgress;
 }

}
