<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Objective\Objective;
use Request;
use DB;
use JWTAuth;

class ExplorerObjective extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_objective';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function objective() {
  return $this->belongsTo('App\Models\Objective\Objective', 'objective_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerObjectives($explorerId) {
  $explorerObjectives = ExplorerObjective::with('objective')
          // ->orderBy('updated_at', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerObjectives;
 }

 public static function getExplorerObjective($explorerId, $objectiveId) {
  $explorerObjective = ExplorerObjective::with('objective')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->where('objective_id', $objectiveId)
          ->first();
  return $explorerObjective;
 }

 public static function createExplorerObjective() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $objective = new Objective;
  $explorerObjective = new ExplorerObjective;
  $objective->creator_id = $userId;
  $objective->title = $title;
  $objective->description = $description;
  $explorerObjective->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $objective->save();
   $explorerObjective->objective()->associate($objective);
   $explorerObjective->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerObjective;
 }

 public static function editExplorerObjective() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerObjectiveId = Request::get("explorerObjectiveId");
  //$objectiveId = Request::get("objectiveId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerObjective = ExplorerObjective::find($explorerObjectiveId);
  $explorerObjective->objective->title = $title;
  $explorerObjective->objective->description = $description;

  DB::beginTransaction();
  try {
   $explorerObjective->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerObjective;
 }

}
