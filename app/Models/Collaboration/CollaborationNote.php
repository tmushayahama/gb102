<?php

namespace App\Models\Collaboration;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class CollaborationNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration_note';
 public $timestamps = false;

 public function collaboration() {
  return $this->belongsTo('App\Models\Collaboration\Collaboration', 'collaboration_id');
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

 public static function getCollaborationNotes($collaborationId) {
  $collaborationNotes = CollaborationNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->get();
  return $collaborationNotes;
 }

 public static function getCollaborationNote($collaborationId, $noteId) {
  $collaborationNote = CollaborationNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('collaboration_id', $collaborationId)
    ->where('note_id', $noteId)
    ->first();
  return $collaborationNote;
 }

 public static function createCollaborationNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $collaborationNote = new CollaborationNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $collaborationNote->collaboration_id = $collaborationId;

  DB::beginTransaction();
  try {
   $note->save();
   $collaborationNote->note()->associate($note);
   $collaborationNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationNote;
 }

 public static function editCollaborationNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationNoteId = Request::get("collaborationNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaborationNote = CollaborationNote::find($collaborationNoteId);
  $collaborationNote->note->title = $title;
  $collaborationNote->note->description = $description;

  DB::beginTransaction();
  try {
   $collaborationNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaborationNote;
 }

}
