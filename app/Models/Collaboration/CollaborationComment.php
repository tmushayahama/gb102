<?php

namespace App\Models\Collaboration;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class CollaborationComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration_comment';
 public $timestamps = false;

 public function collaboration() {
  return $this->belongsTo('App\Models\Collaboration\Collaboration', 'collaboration_id');
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

 public static function getCollaborationComments($collaborationId) {
  $collaborationComments = CollaborationComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->get();
  return $collaborationComments;
 }

 public static function getCollaborationComment($collaborationId, $commentId) {
  $collaborationComment = CollaborationComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->where('comment_id', $commentId)
    ->first();
  return $collaborationComment;
 }

 public static function createCollaborationComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $collaborationComment = new CollaborationComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $collaborationComment->collaboration_id = $collaborationId;

  DB::beginTransaction();
  try {
   $comment->save();
   $collaborationComment->comment()->associate($comment);
   $collaborationComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationComment;
 }

 public static function editCollaborationComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationCommentId = Request::get("collaborationCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaborationComment = CollaborationComment::find($collaborationCommentId);
  $collaborationComment->comment->title = $title;
  $collaborationComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $collaborationComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationComment;
 }

}
