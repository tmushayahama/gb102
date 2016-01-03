<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class ProjectComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_project_comment';
 public $timestamps = false;

 public function project() {
  return $this->belongsTo('App\Models\Project\Project', 'project_id');
 }

 public function comment() {
  return $this->belongsTo('App\Models\Comment\Comment', 'comment_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getProjectComments($projectId) {
  $projectComments = ProjectComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->get();
  return $projectComments;
 }

 public static function getProjectComment($projectId, $commentId) {
  $projectComment = ProjectComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->where('comment_id', $commentId)
    ->first();
  return $projectComment;
 }

 public static function createProjectComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectId = Request::get("projectId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $projectComment = new ProjectComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $projectComment->project_id = $projectId;

  DB::beginTransaction();
  try {
   $comment->save();
   $projectComment->comment()->associate($comment);
   $projectComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectComment;
 }

 public static function editProjectComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectCommentId = Request::get("projectCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $projectComment = ProjectComment::find($projectCommentId);
  $projectComment->comment->title = $title;
  $projectComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $projectComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectComment;
 }

}
