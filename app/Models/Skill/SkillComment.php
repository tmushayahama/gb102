<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class SkillComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill_comment';
 public $timestamps = false;

 public function skill() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_id');
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

 public static function getSkillComments($skillId) {
  $skillComments = SkillComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->get();
  return $skillComments;
 }

 public static function getSkillComment($skillId, $commentId) {
  $skillComment = SkillComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->where('comment_id', $commentId)
    ->first();
  return $skillComment;
 }

 public static function createSkillComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $skillComment = new SkillComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $comment->description = $description;
  $skillComment->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $comment->save();
   $skillComment->comment()->associate($comment);
   $skillComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillComment;
 }

 public static function editSkillComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillCommentId = Request::get("skillCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $skillComment = SkillComment::find($skillCommentId);
  $skillComment->comment->title = $title;
  $skillComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $skillComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillComment;
 }

}
