<?php

namespace App\Models\Swipe;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class SwipeComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_swipe_comment';
 public $timestamps = false;

 public function swipe() {
  return $this->belongsTo('App\Models\Swipe\Swipe', 'swipe_id');
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

 public static function getSwipeComments($swipeId) {
  $swipeComments = SwipeComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->get();
  return $swipeComments;
 }

 public static function getSwipeComment($swipeId, $commentId) {
  $swipeComment = SwipeComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->where('comment_id', $commentId)
    ->first();
  return $swipeComment;
 }

 public static function createSwipeComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $swipeComment = new SwipeComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $swipeComment->swipe_id = $swipeId;

  DB::beginTransaction();
  try {
   $comment->save();
   $swipeComment->comment()->associate($comment);
   $swipeComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeComment;
 }

 public static function editSwipeComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeCommentId = Request::get("swipeCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $swipeComment = SwipeComment::find($swipeCommentId);
  $swipeComment->comment->title = $title;
  $swipeComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $swipeComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeComment;
 }

}
