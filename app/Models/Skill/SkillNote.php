<?php

namespace App\Models\Skill;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class SkillNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_skill_note';
 public $timestamps = false;

 public function skill() {
  return $this->belongsTo('App\Models\Skill\Skill', 'skill_id');
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

 public static function getSkillNotes($skillId) {
  $skillNotes = SkillNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->get();
  return $skillNotes;
 }

 public static function getSkillNote($skillId, $noteId) {
  $skillNote = SkillNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->where('note_id', $noteId)
    ->first();
  return $skillNote;
 }

 public static function createSkillNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $skillNote = new SkillNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $skillNote->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $note->save();
   $skillNote->note()->associate($note);
   $skillNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillNote;
 }

 public static function editSkillNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillNoteId = Request::get("skillNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $skillNote = SkillNote::find($skillNoteId);
  $skillNote->note->title = $title;
  $skillNote->note->description = $description;

  DB::beginTransaction();
  try {
   $skillNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillNote;
 }

}
