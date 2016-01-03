<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Journal extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_journal';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function icon() {
  return $this->belongsTo('App\Models\Icon\Icon', 'icon_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getJournalsAll() {
  $journals = Journal::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $journals;
 }

 public static function getJournalsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journals = Journal::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $journals;
 }

 public static function getJournal($id) {
  $journal = Journal::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $journal; //$journal;
 }

 public static function createJournal() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $journal = new Journal;
  $journal->creator_id = $userId;
  $journal->title = $title;
  $journal->description = $description;
  $journal->level_id = $levelId;

  DB::beginTransaction();
  try {
   $journal->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journal;
 }

 public static function editJournal() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalId = Request::get("journalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $journal = Journal::find($journalId);
  $journal->title = $title;
  $journal->description = $description;

  DB::beginTransaction();
  try {
   $journal->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journal;
 }

}
