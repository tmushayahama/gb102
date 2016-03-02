<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class MentorshipComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_comment';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
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

 public static function getMentorshipComments($mentorshipId) {
  $mentorshipComments = MentorshipComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->get();
  return $mentorshipComments;
 }

 public static function getMentorshipComment($mentorshipId, $commentId) {
  $mentorshipComment = MentorshipComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->where('comment_id', $commentId)
    ->first();
  return $mentorshipComment;
 }

 public static function createMentorshipComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $mentorshipComment = new MentorshipComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $mentorshipComment->mentorship_id = $mentorshipId;

  DB::beginTransaction();
  try {
   $comment->save();
   $mentorshipComment->comment()->associate($comment);
   $mentorshipComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipComment;
 }

 public static function editMentorshipComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipCommentId = Request::get("mentorshipCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipComment = MentorshipComment::find($mentorshipCommentId);
  $mentorshipComment->comment->title = $title;
  $mentorshipComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipComment;
 }

}
