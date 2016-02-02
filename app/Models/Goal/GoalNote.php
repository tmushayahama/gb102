<?php

namespace App\Models\Goal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class GoalNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_goal_note';
 public $timestamps = false;

 public function goal() {
  return $this->belongsTo('App\Models\Goal\Goal', 'goal_id');
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

 public static function getGoalNotes($goalId) {
  $goalNotes = GoalNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->get();
  return $goalNotes;
 }

 public static function getGoalNote($goalId, $noteId) {
  $goalNote = GoalNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('goal_id', $goalId)
    ->where('note_id', $noteId)
    ->first();
  return $goalNote;
 }

 public static function createGoalNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalId = Request::get("goalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $goalNote = new GoalNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $goalNote->goal_id = $goalId;

  DB::beginTransaction();
  try {
   $note->save();
   $goalNote->note()->associate($note);
   $goalNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalNote;
 }

 public static function editGoalNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $goalNoteId = Request::get("goalNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $goalNote = GoalNote::find($goalNoteId);
  $goalNote->note->title = $title;
  $goalNote->note->description = $description;

  DB::beginTransaction();
  try {
   $goalNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $goalNote;
 }

}
