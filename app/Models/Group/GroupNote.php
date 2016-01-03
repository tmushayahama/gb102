<?php

namespace App\Models\Group;

use Illuminate\Database\Eloquent\Model;
use App\Models\Note\Note;
use Request;
use DB;
use JWTAuth;

class GroupNote extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_group_note';
 public $timestamps = false;

 public function group() {
  return $this->belongsTo('App\Models\Group\Group', 'group_id');
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

 public static function getGroupNotes($groupId) {
  $groupNotes = GroupNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->get();
  return $groupNotes;
 }

 public static function getGroupNote($groupId, $noteId) {
  $groupNote = GroupNote::with('note')
    ->orderBy('id', 'DESC')
    ->where('group_id', $groupId)
    ->where('note_id', $noteId)
    ->first();
  return $groupNote;
 }

 public static function createGroupNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupId = Request::get("groupId");
  $title = Request::get("title");
  $description = Request::get("description");
  $note = new Note;
  $groupNote = new GroupNote;
  $note->creator_id = $userId;
  $note->title = $title;
  $note->description = $description;
  $groupNote->group_id = $groupId;

  DB::beginTransaction();
  try {
   $note->save();
   $groupNote->note()->associate($note);
   $groupNote->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupNote;
 }

 public static function editGroupNote() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $groupNoteId = Request::get("groupNoteId");
  //$noteId = Request::get("noteId");
  $title = Request::get("title");
  $description = Request::get("description");
  $groupNote = GroupNote::find($groupNoteId);
  $groupNote->note->title = $title;
  $groupNote->note->description = $description;

  DB::beginTransaction();
  try {
   $groupNote->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $groupNote;
 }

}
