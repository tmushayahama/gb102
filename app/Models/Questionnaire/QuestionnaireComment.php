<?php

namespace App\Models\Questionnaire;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class QuestionnaireComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_questionnaire_comment';
 public $timestamps = false;

 public function questionnaire() {
  return $this->belongsTo('App\Models\Questionnaire\Questionnaire', 'questionnaire_id');
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

 public static function getQuestionnaireComments($questionnaireId) {
  $questionnaireComments = QuestionnaireComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->get();
  return $questionnaireComments;
 }

 public static function getQuestionnaireComment($questionnaireId, $commentId) {
  $questionnaireComment = QuestionnaireComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->where('comment_id', $commentId)
    ->first();
  return $questionnaireComment;
 }

 public static function createQuestionnaireComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireId = Request::get("questionnaireId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $questionnaireComment = new QuestionnaireComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $questionnaireComment->questionnaire_id = $questionnaireId;

  DB::beginTransaction();
  try {
   $comment->save();
   $questionnaireComment->comment()->associate($comment);
   $questionnaireComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireComment;
 }

 public static function editQuestionnaireComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireCommentId = Request::get("questionnaireCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaireComment = QuestionnaireComment::find($questionnaireCommentId);
  $questionnaireComment->comment->title = $title;
  $questionnaireComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $questionnaireComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireComment;
 }

}
