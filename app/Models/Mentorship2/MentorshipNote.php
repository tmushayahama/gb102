<?php

namespace App\Models\Mentorship;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class MentorshipNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_mentorship_note';
 public $timestamps = false;

 public function mentorship() {
  return $this->belongsTo('App\Models\Mentorship\Mentorship', 'mentorship_id');
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

 public static function getMentorshipNotes($mentorshipId) {
  $mentorshipNotes = MentorshipNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->get();
  return $mentorshipNotes;
 }

 public static function getMentorshipNote($mentorshipId, $noteId) {
  $mentorshipNote = MentorshipNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('mentorship_id', $mentorshipId)
    ->where('note_id', $noteId)
    ->first();
  return $mentorshipNote;
 }

 public static function createMentorshipNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipId = Request::get("mentorshipId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $mentorshipNote = new MentorshipNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $mentorshipNote->mentorship_id = $mentorshipId;

  DB::beginTransaction();
  try {
   $note->save();
   $mentorshipNote->note()->associate($note);
   $mentorshipNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipNote;
 }

 public static function editMentorshipNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $mentorshipNoteId = Request::get("mentorshipNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $mentorshipNote = MentorshipNote::find($mentorshipNoteId);
  $mentorshipNote->note->title = $title;
  $mentorshipNote->note->description = $description;

  DB::beginTransaction();
  try {
   $mentorshipNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $mentorshipNote;
 }

}
