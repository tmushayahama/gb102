<?php

namespace App\Models\Teach;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class TeachNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_teach_note';
 public $timestamps = false;

 public function teach() {
  return $this->belongsTo('App\Models\Teach\Teach', 'teach_id');
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

 public static function getTeachNotes($teachId) {
  $teachNotes = TeachNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->get();
  return $teachNotes;
 }

 public static function getTeachNote($teachId, $noteId) {
  $teachNote = TeachNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('teach_id', $teachId)
    ->where('note_id', $noteId)
    ->first();
  return $teachNote;
 }

 public static function createTeachNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachId = Request::get("teachId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $teachNote = new TeachNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $teachNote->teach_id = $teachId;

  DB::beginTransaction();
  try {
   $note->save();
   $teachNote->note()->associate($note);
   $teachNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachNote;
 }

 public static function editTeachNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $teachNoteId = Request::get("teachNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $teachNote = TeachNote::find($teachNoteId);
  $teachNote->note->title = $title;
  $teachNote->note->description = $description;

  DB::beginTransaction();
  try {
   $teachNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $teachNote;
 }

}
