<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Progress\Progress;
use Request;
use DB;
use JWTAuth;

class JournalProgress extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_journal_progress';
 public $timestamps = false;

 public function journal() {
  return $this->belongsTo('App\Models\Journal\Journal', 'journal_id');
 }

 public function progress() {
  return $this->belongsTo('App\Models\Progress\Progress', 'progress_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getJournalProgress($journalId) {
  $journalProgress = JournalProgress::with('progress')
    ->with('progress.creator')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->get();
  return $journalProgress;
 }

 public static function getJournalProgress($journalId, $progressId) {
  $journalProgress = JournalProgress::with('progress')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->where('progress_id', $progressId)
    ->first();
  return $journalProgress;
 }

 public static function createJournalProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalId = Request::get("journalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $progress = new Progress;
  $journalProgress = new JournalProgress;
  $progress->creator_id = $userId;
  $progress->title = $title;
  $journalProgress->journal_id = $journalId;

  DB::beginTransaction();
  try {
   $progress->save();
   $journalProgress->progress()->associate($progress);
   $journalProgress->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalProgress;
 }

 public static function editJournalProgress() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalProgressId = Request::get("journalProgressId");
  //$progressId = Request::get("progressId");
  $title = Request::get("title");
  $description = Request::get("description");
  $journalProgress = JournalProgress::find($journalProgressId);
  $journalProgress->progress->title = $title;
  $journalProgress->progress->description = $description;

  DB::beginTransaction();
  try {
   $journalProgress->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalProgress;
 }

}
