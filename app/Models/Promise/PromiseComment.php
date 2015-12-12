<?php

namespace App\Models\Promise;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class PromiseComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_promise_comment';
 public $timestamps = false;

 public function promise() {
  return $this->belongsTo('App\Models\Promise\Promise', 'promise_id');
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

 public static function getPromiseComments($promiseId) {
  $promiseComments = PromiseComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->get();
  return $promiseComments;
 }

 public static function getPromiseComment($promiseId, $commentId) {
  $promiseComment = PromiseComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->where('comment_id', $commentId)
    ->first();
  return $promiseComment;
 }

 public static function createPromiseComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseId = Request::get("promiseId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $promiseComment = new PromiseComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $promiseComment->promise_id = $promiseId;

  DB::beginTransaction();
  try {
   $comment->save();
   $promiseComment->comment()->associate($comment);
   $promiseComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseComment;
 }

 public static function editPromiseComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseCommentId = Request::get("promiseCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $promiseComment = PromiseComment::find($promiseCommentId);
  $promiseComment->comment->title = $title;
  $promiseComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $promiseComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseComment;
 }

}
