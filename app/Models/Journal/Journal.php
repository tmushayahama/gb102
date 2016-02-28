<?php

namespace App\Models\Journal;

use Illuminate\Database\Eloquent\Model;
use App\Models\AppType\AppType;
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
 public $count = 41;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'mentor_id');
 }

 public function mentor() {
  return $this->belongsTo('App\Models\User\User', 'mentor_id');
 }

 public function mentee() {
  return $this->belongsTo('App\Models\User\User', 'mentee_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getJournalsAll() {
  $journals = Journal::orderBy('id', 'desc')
          ->with('explorer')
          ->whereHas('explorer', function($q) {
           $q->whereNull('parent_explorer_id');
          })
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $journals;
 }

 public static function getSubJournals($journalId) {
  $journals = Journal::orderBy('id', 'desc')
          ->with('explorer')
          ->with('mentor')
          ->with('mentee')
          ->whereHas('explorer', function($q) use ($journalId) {
           $q->where('parent_explorer_id', $journalId);
          })
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $journals;
 }

 public static function getJournals($appName) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $journals = Journal::where('app_type_id', $appId->id)
           ->orderBy('id', 'desc')
           ->with('explorer')
           ->with('explorer.app_type')
           ->with('explorer.creator')
           ->with('explorer.icon')
           ->with('explorer.level')
           ->take(100)
           ->get();
  }
  return $journals;
 }

 public static function getJournalsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $journals = Journal::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $journals;
 }

 public static function getJournal($id) {
  $journal = Journal::with('creator')
          ->with('mentor')
          ->with('mentee')
          ->with('explorer')
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $journal; //$journal;
 }

 public static function createJournal() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("app_type_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $journal = new Journal;
  $journal->creator_id = $userId;
  $journal->app_type_id = $appTypeId;
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

 public function scopeSearchByKeyword($query, $keyword) {
  if ($keyword != '') {
   $query->where(function ($query) use ($keyword) {
    $query->where("title", "LIKE", "%$keyword%")
            ->orWhere("description", "LIKE", "%$keyword%");
   });
  }
  return $query;
 }

}
