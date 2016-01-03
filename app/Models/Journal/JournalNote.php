<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class JournalNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_journal_note';
 public $timestamps = false;

 public function journal() {
  return $this->belongsTo('App\Models\Journal\Journal', 'journal_id');
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

 public static function getJournalNotes($journalId) {
  $journalNotes = JournalNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->get();
  return $journalNotes;
 }

 public static function getJournalNote($journalId, $noteId) {
  $journalNote = JournalNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->where('note_id', $noteId)
    ->first();
  return $journalNote;
 }

 public static function createJournalNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalId = Request::get("journalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $journalNote = new JournalNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $journalNote->journal_id = $journalId;

  DB::beginTransaction();
  try {
   $note->save();
   $journalNote->note()->associate($note);
   $journalNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalNote;
 }

 public static function editJournalNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalNoteId = Request::get("journalNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $journalNote = JournalNote::find($journalNoteId);
  $journalNote->note->title = $title;
  $journalNote->note->description = $description;

  DB::beginTransaction();
  try {
   $journalNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalNote;
 }

}
