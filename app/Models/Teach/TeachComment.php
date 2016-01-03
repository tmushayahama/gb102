<?php

namespace App\Models\Teach;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class TeachComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_teach_comment';
 public $timestamps = false;

 public function teach() {
  return $this->belongsTo('App\Models\Teach\Teach', 'teach_id');
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

 public static function getTeachComments($teachId) {
  $teachComments = TeachComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->get();
  return $teachComments;
 }

 public static function getTeachComment($teachId, $commentId) {
  $teachComment = TeachComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->where('comment_id', $commentId)
    ->first();
  return $teachComment;
 }

 public static function createTeachComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachId = Request::get("teachId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $teachComment = new TeachComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $teachComment->teach_id = $teachId;

  DB::beginTransaction();
  try {
   $comment->save();
   $teachComment->comment()->associate($comment);
   $teachComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachComment;
 }

 public static function editTeachComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachCommentId = Request::get("teachCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $teachComment = TeachComment::find($teachCommentId);
  $teachComment->comment->title = $title;
  $teachComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $teachComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachComment;
 }

}
