<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class ProfileComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_profile_comment';
 public $timestamps = false;

 public function profile() {
  return $this->belongsTo('App\Models\Profile\Profile', 'profile_id');
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

 public static function getProfileComments($profileId) {
  $profileComments = ProfileComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->get();
  return $profileComments;
 }

 public static function getProfileComment($profileId, $commentId) {
  $profileComment = ProfileComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->where('comment_id', $commentId)
    ->first();
  return $profileComment;
 }

 public static function createProfileComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileId = Request::get("profileId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $profileComment = new ProfileComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $profileComment->profile_id = $profileId;

  DB::beginTransaction();
  try {
   $comment->save();
   $profileComment->comment()->associate($comment);
   $profileComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileComment;
 }

 public static function editProfileComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileCommentId = Request::get("profileCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $profileComment = ProfileComment::find($profileCommentId);
  $profileComment->comment->title = $title;
  $profileComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $profileComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileComment;
 }

}
