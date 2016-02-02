<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Timeline\Timeline;
use Request;
use DB;
use JWTAuth;

class JournalTimeline extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_journal_timeline';
 public $timestamps = false;

 public function journal() {
  return $this->belongsTo('App\Models\Journal\Journal', 'journal_id');
 }

 public function timeline() {
  return $this->belongsTo('App\Models\Timeline\Timeline', 'timeline_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getJournalTimelines($journalId) {
  $journalTimelines = JournalTimeline::with('timeline')
    ->with('timeline.creator')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->get();
  return $journalTimelines;
 }

 public static function getJournalTimeline($journalId, $timelineId) {
  $journalTimeline = JournalTimeline::with('timeline')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->where('timeline_id', $timelineId)
    ->first();
  return $journalTimeline;
 }

 public static function createJournalTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalId = Request::get("journalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $timeline = new Timeline;
  $journalTimeline = new JournalTimeline;
  $timeline->creator_id = $userId;
  $timeline->title = $title;
  $journalTimeline->journal_id = $journalId;

  DB::beginTransaction();
  try {
   $timeline->save();
   $journalTimeline->timeline()->associate($timeline);
   $journalTimeline->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalTimeline;
 }

 public static function editJournalTimeline() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalTimelineId = Request::get("journalTimelineId");
  //$timelineId = Request::get("timelineId");
  $title = Request::get("title");
  $description = Request::get("description");
  $journalTimeline = JournalTimeline::find($journalTimelineId);
  $journalTimeline->timeline->title = $title;
  $journalTimeline->timeline->description = $description;

  DB::beginTransaction();
  try {
   $journalTimeline->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalTimeline;
 }

}
