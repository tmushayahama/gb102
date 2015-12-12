<?php

namespace App\Models\Hobby;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class HobbyComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_hobby_comment';
 public $timestamps = false;

 public function hobby() {
  return $this->belongsTo('App\Models\Hobby\Hobby', 'hobby_id');
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

 public static function getHobbyComments($hobbyId) {
  $hobbyComments = HobbyComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->get();
  return $hobbyComments;
 }

 public static function getHobbyComment($hobbyId, $commentId) {
  $hobbyComment = HobbyComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->where('comment_id', $commentId)
    ->first();
  return $hobbyComment;
 }

 public static function createHobbyComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyId = Request::get("hobbyId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $hobbyComment = new HobbyComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $hobbyComment->hobby_id = $hobbyId;

  DB::beginTransaction();
  try {
   $comment->save();
   $hobbyComment->comment()->associate($comment);
   $hobbyComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyComment;
 }

 public static function editHobbyComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyCommentId = Request::get("hobbyCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $hobbyComment = HobbyComment::find($hobbyCommentId);
  $hobbyComment->comment->title = $title;
  $hobbyComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $hobbyComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyComment;
 }

}
