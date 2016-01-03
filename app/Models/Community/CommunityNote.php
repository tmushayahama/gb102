<?php

namespace App\Models\Community;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class CommunityNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_community_note';
 public $timestamps = false;

 public function community() {
  return $this->belongsTo('App\Models\Community\Community', 'community_id');
 }

 public function note() {
  return $this->belongsTo('App\Models\Note\Note', 'note_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getCommunityNotes($communityId) {
  $communityNotes = CommunityNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->get();
  return $communityNotes;
 }

 public static function getCommunityNote($communityId, $noteId) {
  $communityNote = CommunityNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->where('note_id', $noteId)
    ->first();
  return $communityNote;
 }

 public static function createCommunityNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityId = Request::get("communityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $communityNote = new CommunityNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $communityNote->community_id = $communityId;

  DB::beginTransaction();
  try {
   $note->save();
   $communityNote->note()->associate($note);
   $communityNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityNote;
 }

 public static function editCommunityNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityNoteId = Request::get("communityNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $communityNote = CommunityNote::find($communityNoteId);
  $communityNote->note->title = $title;
  $communityNote->note->description = $description;

  DB::beginTransaction();
  try {
   $communityNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityNote;
 }

}
