<?php

namespace App\Models\Questionnaire;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class QuestionnaireNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_questionnaire_note';
 public $timestamps = false;

 public function questionnaire() {
  return $this->belongsTo('App\Models\Questionnaire\Questionnaire', 'questionnaire_id');
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

 public static function getQuestionnaireNotes($questionnaireId) {
  $questionnaireNotes = QuestionnaireNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->get();
  return $questionnaireNotes;
 }

 public static function getQuestionnaireNote($questionnaireId, $noteId) {
  $questionnaireNote = QuestionnaireNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('questionnaire_id', $questionnaireId)
    ->where('note_id', $noteId)
    ->first();
  return $questionnaireNote;
 }

 public static function createQuestionnaireNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireId = Request::get("questionnaireId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $questionnaireNote = new QuestionnaireNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $questionnaireNote->questionnaire_id = $questionnaireId;

  DB::beginTransaction();
  try {
   $note->save();
   $questionnaireNote->note()->associate($note);
   $questionnaireNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireNote;
 }

 public static function editQuestionnaireNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $questionnaireNoteId = Request::get("questionnaireNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $questionnaireNote = QuestionnaireNote::find($questionnaireNoteId);
  $questionnaireNote->note->title = $title;
  $questionnaireNote->note->description = $description;

  DB::beginTransaction();
  try {
   $questionnaireNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $questionnaireNote;
 }

}
