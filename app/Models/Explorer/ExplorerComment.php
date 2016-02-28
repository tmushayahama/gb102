<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment\Comment;
use Request;
use DB;
use JWTAuth;

class ExplorerComment extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_comment';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
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

 public static function getExplorerComments($explorerId) {
  $explorerComments = ExplorerComment::with('comment')
    ->with('comment.creator')
    ->orderBy('id', 'DESC')
    ->where('explorer_id', $explorerId)
    ->get();
  return $explorerComments;
 }

 public static function getExplorerComment($explorerId, $commentId) {
  $explorerComment = ExplorerComment::with('comment')
    ->orderBy('id', 'DESC')
    ->where('explorer_id', $explorerId)
    ->where('comment_id', $commentId)
    ->first();
  return $explorerComment;
 }

 public static function createExplorerComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $comment = new Comment;
  $explorerComment = new ExplorerComment;
  $comment->creator_id = $userId;
  $comment->title = $title;
  $explorerComment->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $comment->save();
   $explorerComment->comment()->associate($comment);
   $explorerComment->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerComment;
 }

 public static function editExplorerComment() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerCommentId = Request::get("explorerCommentId");
  //$commentId = Request::get("commentId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerComment = ExplorerComment::find($explorerCommentId);
  $explorerComment->comment->title = $title;
  $explorerComment->comment->description = $description;

  DB::beginTransaction();
  try {
   $explorerComment->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerComment;
 }

}
