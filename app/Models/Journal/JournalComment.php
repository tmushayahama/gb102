<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class JournalComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_journal_comment';
 public $timestamps = false;

 public function journal() {
  return $this->belongsTo('App\Models\Journal\Journal', 'journal_id');
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

 public static function getJournalComments($journalId) {
  $journalComments = JournalComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->get();
  return $journalComments;
 }

 public static function getJournalComment($journalId, $commentId) {
  $journalComment = JournalComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->where('comment_id', $commentId)
    ->first();
  return $journalComment;
 }

 public static function createJournalComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalId = Request::get("journalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $journalComment = new JournalComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $journalComment->journal_id = $journalId;

  DB::beginTransaction();
  try {
   $comment->save();
   $journalComment->comment()->associate($comment);
   $journalComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalComment;
 }

 public static function editJournalComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalCommentId = Request::get("journalCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $journalComment = JournalComment::find($journalCommentId);
  $journalComment->comment->title = $title;
  $journalComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $journalComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalComment;
 }

}
