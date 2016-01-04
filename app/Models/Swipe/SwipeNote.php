<?php

namespace App\Models\Swipe;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class SwipeNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_swipe_note';
 public $timestamps = false;

 public function swipe() {
  return $this->belongsTo('App\Models\Swipe\Swipe', 'swipe_id');
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

 public static function getSwipeNotes($swipeId) {
  $swipeNotes = SwipeNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->get();
  return $swipeNotes;
 }

 public static function getSwipeNote($swipeId, $noteId) {
  $swipeNote = SwipeNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('swipe_id', $swipeId)
    ->where('note_id', $noteId)
    ->first();
  return $swipeNote;
 }

 public static function createSwipeNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $swipeNote = new SwipeNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $swipeNote->swipe_id = $swipeId;

  DB::beginTransaction();
  try {
   $note->save();
   $swipeNote->note()->associate($note);
   $swipeNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeNote;
 }

 public static function editSwipeNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $swipeNoteId = Request::get("swipeNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $swipeNote = SwipeNote::find($swipeNoteId);
  $swipeNote->note->title = $title;
  $swipeNote->note->description = $description;

  DB::beginTransaction();
  try {
   $swipeNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $swipeNote;
 }

}
