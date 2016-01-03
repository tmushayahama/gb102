<?php

namespace App\Models\Group;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class GroupComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_group_comment';
 public $timestamps = false;

 public function group() {
  return $this->belongsTo('App\Models\Group\Group', 'group_id');
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

 public static function getGroupComments($groupId) {
  $groupComments = GroupComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->get();
  return $groupComments;
 }

 public static function getGroupComment($groupId, $commentId) {
  $groupComment = GroupComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->where('comment_id', $commentId)
    ->first();
  return $groupComment;
 }

 public static function createGroupComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupId = Request::get("groupId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $groupComment = new GroupComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $groupComment->group_id = $groupId;

  DB::beginTransaction();
  try {
   $comment->save();
   $groupComment->comment()->associate($comment);
   $groupComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupComment;
 }

 public static function editGroupComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupCommentId = Request::get("groupCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $groupComment = GroupComment::find($groupCommentId);
  $groupComment->comment->title = $title;
  $groupComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $groupComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupComment;
 }

}
