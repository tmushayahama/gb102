<?php

namespace App\Models\Journal;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class JournalSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_journal_swipe';
 public $timestamps = false;

 public function journal() {
  return $this->belongsTo('App\Models\Journal\Journal', 'journal_id');
 }

 public function journal_modified() {
  return $this->belongsTo('App\Models\Journal\Journal', 'journal_modified_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getJournalSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalSwipes = JournalSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('journal')
          ->with('creator')
          ->with('journal.creator')
          ->with('journal.icon')
          ->with('journal.level')
          ->take(50)
          ->get();
  return $journalSwipes;
 }

 public static function getJournalSwipe() {
  $howMany = 1;
  $journalSwipes = (new Collection(
          Journal::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $journalSwipes;
 }

 public static function createJournalSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalId = Request::get("journalId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $journalSwipe = new JournalSwipe;
  $journalSwipe->creator_id = $userId;
  $journalSwipe->journal_id = $journalId;
  $journalSwipe->level_id = $level_id;
  $journalSwipe->description = $description;

  DB::beginTransaction();
  try {
   $journalSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalSwipe;
 }

 public static function editJournalSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalSwipeId = Request::get("journalSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $journalSwipe = JournalSwipe::find($journalSwipeId);
  $journalSwipe->swipe->title = $title;
  $journalSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $journalSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalSwipe;
 }

}
