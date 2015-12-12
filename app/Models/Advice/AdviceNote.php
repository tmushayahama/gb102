<?php

namespace App\Models\Advice;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class AdviceNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_advice_note';
 public $timestamps = false;

 public function advice() {
  return $this->belongsTo('App\Models\Advice\Advice', 'advice_id');
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

 public static function getAdviceNotes($adviceId) {
  $adviceNotes = AdviceNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->get();
  return $adviceNotes;
 }

 public static function getAdviceNote($adviceId, $noteId) {
  $adviceNote = AdviceNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('advice_id', $adviceId)
    ->where('note_id', $noteId)
    ->first();
  return $adviceNote;
 }

 public static function createAdviceNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceId = Request::get("adviceId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $adviceNote = new AdviceNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $adviceNote->advice_id = $adviceId;

  DB::beginTransaction();
  try {
   $note->save();
   $adviceNote->note()->associate($note);
   $adviceNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceNote;
 }

 public static function editAdviceNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $adviceNoteId = Request::get("adviceNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $adviceNote = AdviceNote::find($adviceNoteId);
  $adviceNote->note->title = $title;
  $adviceNote->note->description = $description;

  DB::beginTransaction();
  try {
   $adviceNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $adviceNote;
 }

}
