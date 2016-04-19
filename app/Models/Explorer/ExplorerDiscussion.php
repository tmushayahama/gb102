<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Discussion\Discussion;
use Request;
use DB;
use JWTAuth;

class ExplorerDiscussion extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_discussion';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function discussion() {
  return $this->belongsTo('App\Models\Discussion\Discussion', 'discussion_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerDiscussions($explorerId) {
  $explorerDiscussions = ExplorerDiscussion::with('discussion')
          ->with('discussion.creator')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerDiscussions;
 }

 public static function getExplorerDiscussion($explorerId, $discussionId) {
  $explorerDiscussion = ExplorerDiscussion::with('discussion')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->where('discussion_id', $discussionId)
          ->first();
  return $explorerDiscussion;
 }

 public static function createExplorerDiscussion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $discussion = new Discussion;
  $explorerDiscussion = new ExplorerDiscussion;
  $discussion->creator_id = $userId;
  $discussion->title = $title;
  $explorerDiscussion->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $discussion->save();
   $explorerDiscussion->discussion()->associate($discussion);
   $explorerDiscussion->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerDiscussion;
 }

 public static function editExplorerDiscussion() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerDiscussionId = Request::get("explorerDiscussionId");
  //$discussionId = Request::get("discussionId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerDiscussion = ExplorerDiscussion::find($explorerDiscussionId);
  $explorerDiscussion->discussion->title = $title;
  $explorerDiscussion->discussion->description = $description;

  DB::beginTransaction();
  try {
   $explorerDiscussion->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerDiscussion;
 }

}
