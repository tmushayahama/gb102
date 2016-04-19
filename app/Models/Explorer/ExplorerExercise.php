<?php

namespace App\Models\Explorer;

use Illuminate\Database\Eloquent\Model;
use App\Models\Exercise\Exercise;
use Request;
use DB;
use JWTAuth;

class ExplorerExercise extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_explorer_exercise';
 public $timestamps = false;

 public function explorer() {
  return $this->belongsTo('App\Models\Explorer\Explorer', 'explorer_id');
 }

 public function exercise() {
  return $this->belongsTo('App\Models\Exercise\Exercise', 'exercise_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getExplorerExercises($explorerId) {
  $explorerExercises = ExplorerExercise::with('exercise')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->get();
  return $explorerExercises;
 }

 public static function getExplorerExercise($explorerId, $exerciseId) {
  $explorerExercise = ExplorerExercise::with('exercise')
          ->orderBy('id', 'DESC')
          ->where('explorer_id', $explorerId)
          ->where('exercise_id', $exerciseId)
          ->first();
  return $explorerExercise;
 }

 public static function createExplorerExercise() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerId = Request::get("explorerId");
  $title = Request::get("title");
  $description = Request::get("description");
  $exercise = new Exercise;
  $explorerExercise = new ExplorerExercise;
  $exercise->creator_id = $userId;
  $exercise->title = $title;
  $exercise->description = $description;
  $explorerExercise->explorer_id = $explorerId;

  DB::beginTransaction();
  try {
   $exercise->save();
   $explorerExercise->exercise()->associate($exercise);
   $explorerExercise->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerExercise;
 }

 public static function editExplorerExercise() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $explorerExerciseId = Request::get("explorerExerciseId");
  //$exerciseId = Request::get("exerciseId");
  $title = Request::get("title");
  $description = Request::get("description");
  $explorerExercise = ExplorerExercise::find($explorerExerciseId);
  $explorerExercise->exercise->title = $title;
  $explorerExercise->exercise->description = $description;

  DB::beginTransaction();
  try {
   $explorerExercise->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $explorerExercise;
 }

}
