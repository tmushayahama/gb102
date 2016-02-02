<?php

namespace App\Models\Advice;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class AdviceComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_advice_comment';
 public $timestamps = false;

 public function advice() {
  return $this->belongsTo('App\Models\Advice\Advice', 'advice_id');
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

 public static function getAdviceComments($adviceId) {
  $adviceComments = AdviceComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->get();
  return $adviceComments;
 }

 public static function getAdviceComment($adviceId, $commentId) {
  $adviceComment = AdviceComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->where('comment_id', $commentId)
    ->first();
  return $adviceComment;
 }

 public static function createAdviceComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceId = Request::get("adviceId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $adviceComment = new AdviceComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $adviceComment->advice_id = $adviceId;

  DB::beginTransaction();
  try {
   $comment->save();
   $adviceComment->comment()->associate($comment);
   $adviceComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceComment;
 }

 public static function editAdviceComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceCommentId = Request::get("adviceCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $adviceComment = AdviceComment::find($adviceCommentId);
  $adviceComment->comment->title = $title;
  $adviceComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $adviceComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceComment;
 }

}
