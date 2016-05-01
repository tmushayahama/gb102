<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class ExplorerNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_note';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
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

 public static function getExplorerNotes($explorerId) {
  $explorerNotes = ExplorerNote::with('note')
          ->with('note.creator')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerNotes;
 }

 public static function getExplorerNote($explorerId, $noteId) {
  $explorerNote = ExplorerNote::with('note')
          ->with('note.creator')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->where('note_id', $noteId)
          ->first();
  return $explorerNote;
 }

 public static function createExplorerNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $explorerNote = new ExplorerNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $explorerNote->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $note->save();
   $explorerNote->note()->associate($note);
   $explorerNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerNote;
 }

 public static function editExplorerNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerNoteId = Request::get("explorerNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerNote = ExplorerNote::find($explorerNoteId);
  $explorerNote->note->title = $title;
  $explorerNote->note->description = $description;

  DB::beginTransaction();
  try {
   $explorerNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerNote;
 }

}
