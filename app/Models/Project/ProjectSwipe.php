<?php

namespace App\Models\Project;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ProjectSwipe extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_project_swipe';
 public $timestamps = false;

 public function project() {
  return $this->belongsTo('App\Models\Project\Project', 'project_id');
 }

 public function project_modified() {
  return $this->belongsTo('App\Models\Project\Project', 'project_modified_id');
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

 public static function getProjectSwipes() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectSwipes = ProjectSwipe::where('creator_id', $userId)
          ->orderBy('id', 'desc')
          ->with('project')
          ->with('creator')
          ->with('project.creator')
          ->with('project.icon')
          ->with('project.level')
          ->take(50)
          ->get();
  return $projectSwipes;
 }

 public static function getProjectSwipe() {
  $howMany = 1;
  $projectSwipes = (new Collection(
          Project::with('icon')
          ->with('creator')
          ->with('level')
          ->get()))
          ->random($howMany);
  return $projectSwipes;
 }

 public static function createProjectSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectId = Request::get("projectId");
  $level_id = Request::get("levelId");
  $description = Request::get("description");
  $projectSwipe = new ProjectSwipe;
  $projectSwipe->creator_id = $userId;
  $projectSwipe->project_id = $projectId;
  $projectSwipe->level_id = $level_id;
  $projectSwipe->description = $description;

  DB::beginTransaction();
  try {
   $projectSwipe->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectSwipe;
 }

 public static function editProjectSwipe() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectSwipeId = Request::get("projectSwipeId");
  //$swipeId = Request::get("swipeId");
  $title = Request::get("title");
  $description = Request::get("description");
  $projectSwipe = ProjectSwipe::find($projectSwipeId);
  $projectSwipe->swipe->title = $title;
  $projectSwipe->swipe->description = $description;

  DB::beginTransaction();
  try {
   $projectSwipe->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectSwipe;
 }

}
