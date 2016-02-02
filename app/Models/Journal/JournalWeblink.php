<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class JournalWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_journal_weblink';
 public $timestamps = false;

 public function journal() {
  return $this->belongsTo('App\Models\Journal\Journal', 'journal_id');
 }

 public function weblink() {
  return $this->belongsTo('App\Models\Weblink\Weblink', 'weblink_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getJournalWeblinks($journalId) {
  $journalWeblinks = JournalWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->get();
  return $journalWeblinks;
 }

 public static function getJournalWeblink($journalId, $weblinkId) {
  $journalWeblink = JournalWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('journal_id', $journalId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $journalWeblink;
 }

 public static function createJournalWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalId = Request::get("journalId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $journalWeblink = new JournalWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $journalWeblink->journal_id = $journalId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $journalWeblink->weblink()->associate($weblink);
   $journalWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalWeblink;
 }

 public static function editJournalWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journalWeblinkId = Request::get("journalWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $journalWeblink = JournalWeblink::find($journalWeblinkId);
  $journalWeblink->weblink->title = $title;
  $journalWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $journalWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $journalWeblink;
 }

}
