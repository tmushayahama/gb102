<?php

namespace App\Models\Community;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class CommunityComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_community_comment';
 public $timestamps = false;

 public function community() {
  return $this->belongsTo('App\Models\Community\Community', 'community_id');
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

 public static function getCommunityComments($communityId) {
  $communityComments = CommunityComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->get();
  return $communityComments;
 }

 public static function getCommunityComment($communityId, $commentId) {
  $communityComment = CommunityComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->where('comment_id', $commentId)
    ->first();
  return $communityComment;
 }

 public static function createCommunityComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityId = Request::get("communityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $communityComment = new CommunityComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $communityComment->community_id = $communityId;

  DB::beginTransaction();
  try {
   $comment->save();
   $communityComment->comment()->associate($comment);
   $communityComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityComment;
 }

 public static function editCommunityComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityCommentId = Request::get("communityCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $communityComment = CommunityComment::find($communityCommentId);
  $communityComment->comment->title = $title;
  $communityComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $communityComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityComment;
 }

}
