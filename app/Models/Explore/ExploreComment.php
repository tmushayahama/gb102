<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class ExploreComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_comment';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
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

 public static function getExploreComments($exploreId) {
  $exploreComments = ExploreComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('explore_id', $exploreId)
    ->get();
  return $exploreComments;
 }

 public static function getExploreComment($exploreId, $commentId) {
  $exploreComment = ExploreComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('explore_id', $exploreId)
    ->where('comment_id', $commentId)
    ->first();
  return $exploreComment;
 }

 public static function createExploreComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $exploreComment = new ExploreComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $exploreComment->explore_id = $exploreId;

  DB::beginTransaction();
  try {
   $comment->save();
   $exploreComment->comment()->associate($comment);
   $exploreComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreComment;
 }

 public static function editExploreComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreCommentId = Request::get("exploreCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreComment = ExploreComment::find($exploreCommentId);
  $exploreComment->comment->title = $title;
  $exploreComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $exploreComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreComment;
 }

}
