<?php

namespace App\Models\Explore;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class ExploreNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explore_note';
 public $timestamps = false;

 public function explore() {
  return $this->belongsTo('App\Models\Explore\Explore', 'explore_id');
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

 public static function getExploreNotes($exploreId) {
  $exploreNotes = ExploreNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('explore_id', $exploreId)
    ->get();
  return $exploreNotes;
 }

 public static function getExploreNote($exploreId, $noteId) {
  $exploreNote = ExploreNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('explore_id', $exploreId)
    ->where('note_id', $noteId)
    ->first();
  return $exploreNote;
 }

 public static function createExploreNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreId = Request::get("exploreId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $exploreNote = new ExploreNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $exploreNote->explore_id = $exploreId;

  DB::beginTransaction();
  try {
   $note->save();
   $exploreNote->note()->associate($note);
   $exploreNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreNote;
 }

 public static function editExploreNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $exploreNoteId = Request::get("exploreNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exploreNote = ExploreNote::find($exploreNoteId);
  $exploreNote->note->title = $title;
  $exploreNote->note->description = $description;

  DB::beginTransaction();
  try {
   $exploreNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $exploreNote;
 }

}
