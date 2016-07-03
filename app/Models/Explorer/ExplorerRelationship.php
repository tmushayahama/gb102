<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
//use App\Models\Relationship\Relationship;
use Request;
use DB;
use JWTAuth;

class ExplorerRelationship extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_relationship';
 public $timestamps = false;

 public function first_explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'first_explorer_id');
 }

 public function second_explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'second_explorer_id');
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

 public static function getSubExplorers($explorerId) {
  $explorers = ExplorerRelationship::orderBy('id', 'desc')
          ->where('second_explorer_id', $explorerId)
          ->with('first_explorer')
          ->with('first_explorer.app_type')
          ->with('first_explorer.creator')
          ->with('first_explorer.level')
          ->take(100)
          ->get();
  return $explorers;
 }

 public static function getSubExplorersStats($explorerId) {
  $explorersCount = Explorer::where('parent_explorer_id', $explorerId)
          ->count();
  return array('totalCount' => $explorersCount);
 }

 public static function getExplorerRelationships($explorerId) {
  $explorerRelationships = ExplorerRelationship::with('relationship')
          ->with('relationship.creator')
          ->whereHas('relationship', function($q) {
           $q->whereNull('parent_relationship_id');
          })
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerRelationships;
 }

 public static function getExplorerRelationship($explorerId, $relationshipId) {
  $explorerRelationship = ExplorerRelationship::with('relationship')
          ->orderBy('id', 'DESC')
          ->with('relationship.creator')
          ->where('explorer_id', $explorerId)
          ->where('relationship_id', $relationshipId)
          ->first();
  return $explorerRelationship;
 }

 public static function createExplorerRelationship() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $relationship = new Relationship;
  $explorerRelationship = new ExplorerRelationship;
  $relationship->creator_id = $userId;
  $relationship->title = $title;
  $relationship->description = $description;
  $explorerRelationship->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $relationship->save();
   $explorerRelationship->relationship()->associate($relationship);
   $explorerRelationship->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerRelationship;
 }

 public static function editExplorerRelationship() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerRelationshipId = Request::get("explorerRelationshipId");
  //$relationshipId = Request::get("relationshipId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerRelationship = ExplorerRelationship::find($explorerRelationshipId);
  $explorerRelationship->relationship->title = $title;
  $explorerRelationship->relationship->description = $description;

  DB::beginTransaction();
  try {
   $explorerRelationship->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerRelationship;
 }

}
