<?php

namespace App\Models\Hobby;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class HobbyNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_hobby_note';
 public $timestamps = false;

 public function hobby() {
  return $this->belongsTo('App\Models\Hobby\Hobby', 'hobby_id');
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

 public static function getHobbyNotes($hobbyId) {
  $hobbyNotes = HobbyNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->get();
  return $hobbyNotes;
 }

 public static function getHobbyNote($hobbyId, $noteId) {
  $hobbyNote = HobbyNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('hobby_id', $hobbyId)
    ->where('note_id', $noteId)
    ->first();
  return $hobbyNote;
 }

 public static function createHobbyNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyId = Request::get("hobbyId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $hobbyNote = new HobbyNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $hobbyNote->hobby_id = $hobbyId;

  DB::beginTransaction();
  try {
   $note->save();
   $hobbyNote->note()->associate($note);
   $hobbyNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyNote;
 }

 public static function editHobbyNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $hobbyNoteId = Request::get("hobbyNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $hobbyNote = HobbyNote::find($hobbyNoteId);
  $hobbyNote->note->title = $title;
  $hobbyNote->note->description = $description;

  DB::beginTransaction();
  try {
   $hobbyNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $hobbyNote;
 }

}
