<?php

namespace App\Models\Goal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class GoalComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_goal_comment';
 public $timestamps = false;

 public function goal() {
  return $this->belongsTo('App\Models\Goal\Goal', 'goal_id');
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

 public static function getGoalComments($goalId) {
  $goalComments = GoalComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->get();
  return $goalComments;
 }

 public static function getGoalComment($goalId, $commentId) {
  $goalComment = GoalComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->where('comment_id', $commentId)
    ->first();
  return $goalComment;
 }

 public static function createGoalComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalId = Request::get("goalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $goalComment = new GoalComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $goalComment->goal_id = $goalId;

  DB::beginTransaction();
  try {
   $comment->save();
   $goalComment->comment()->associate($comment);
   $goalComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalComment;
 }

 public static function editGoalComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalCommentId = Request::get("goalCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $goalComment = GoalComment::find($goalCommentId);
  $goalComment->comment->title = $title;
  $goalComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $goalComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalComment;
 }

}
