<?php

namespace App\Models\Collaboration;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class CollaborationProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration_progress';
 public $timestamps = false;

 public function collaboration() {
  return $this->belongsTo('App\Models\Collaboration\Collaboration', 'collaboration_id');
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

 public static function getCollaborationProgress($collaborationId) {
  $collaborationProgress = CollaborationProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->get();
  return $collaborationProgress;
 }

 public static function getCollaborationProgress($collaborationId, $progressId) {
  $collaborationProgress = CollaborationProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->where('progress_id', $progressId)
    ->first();
  return $collaborationProgress;
 }

 public static function createCollaborationProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $collaborationProgress = new CollaborationProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $collaborationProgress->collaboration_id = $collaborationId;

  DB::beginTransaction();
  try {
   $progress->save();
   $collaborationProgress->progress()->associate($progress);
   $collaborationProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationProgress;
 }

 public static function editCollaborationProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationProgressId = Request::get("collaborationProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaborationProgress = CollaborationProgress::find($collaborationProgressId);
  $collaborationProgress->progress->title = $title;
  $collaborationProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $collaborationProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationProgress;
 }

}
