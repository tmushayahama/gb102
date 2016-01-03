<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class ProfileNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_profile_note';
 public $timestamps = false;

 public function profile() {
  return $this->belongsTo('App\Models\Profile\Profile', 'profile_id');
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

 public static function getProfileNotes($profileId) {
  $profileNotes = ProfileNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->get();
  return $profileNotes;
 }

 public static function getProfileNote($profileId, $noteId) {
  $profileNote = ProfileNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('profile_id', $profileId)
    ->where('note_id', $noteId)
    ->first();
  return $profileNote;
 }

 public static function createProfileNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileId = Request::get("profileId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $profileNote = new ProfileNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $profileNote->profile_id = $profileId;

  DB::beginTransaction();
  try {
   $note->save();
   $profileNote->note()->associate($note);
   $profileNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileNote;
 }

 public static function editProfileNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profileNoteId = Request::get("profileNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $profileNote = ProfileNote::find($profileNoteId);
  $profileNote->note->title = $title;
  $profileNote->note->description = $description;

  DB::beginTransaction();
  try {
   $profileNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $profileNote;
 }

}
