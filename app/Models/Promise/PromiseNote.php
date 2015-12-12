<?php

namespace App\Models\Promise;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class PromiseNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_promise_note';
 public $timestamps = false;

 public function promise() {
  return $this->belongsTo('App\Models\Promise\Promise', 'promise_id');
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

 public static function getPromiseNotes($promiseId) {
  $promiseNotes = PromiseNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->get();
  return $promiseNotes;
 }

 public static function getPromiseNote($promiseId, $noteId) {
  $promiseNote = PromiseNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('promise_id', $promiseId)
    ->where('note_id', $noteId)
    ->first();
  return $promiseNote;
 }

 public static function createPromiseNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseId = Request::get("promiseId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $promiseNote = new PromiseNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $promiseNote->promise_id = $promiseId;

  DB::beginTransaction();
  try {
   $note->save();
   $promiseNote->note()->associate($note);
   $promiseNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseNote;
 }

 public static function editPromiseNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseNoteId = Request::get("promiseNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $promiseNote = PromiseNote::find($promiseNoteId);
  $promiseNote->note->title = $title;
  $promiseNote->note->description = $description;

  DB::beginTransaction();
  try {
   $promiseNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promiseNote;
 }

}
