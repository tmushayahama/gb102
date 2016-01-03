<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class ProjectNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_project_note';
 public $timestamps = false;

 public function project() {
  return $this->belongsTo('App\Models\Project\Project', 'project_id');
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

 public static function getProjectNotes($projectId) {
  $projectNotes = ProjectNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->get();
  return $projectNotes;
 }

 public static function getProjectNote($projectId, $noteId) {
  $projectNote = ProjectNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->where('note_id', $noteId)
    ->first();
  return $projectNote;
 }

 public static function createProjectNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectId = Request::get("projectId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $projectNote = new ProjectNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $projectNote->project_id = $projectId;

  DB::beginTransaction();
  try {
   $note->save();
   $projectNote->note()->associate($note);
   $projectNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectNote;
 }

 public static function editProjectNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectNoteId = Request::get("projectNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $projectNote = ProjectNote::find($projectNoteId);
  $projectNote->note->title = $title;
  $projectNote->note->description = $description;

  DB::beginTransaction();
  try {
   $projectNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectNote;
 }

}
