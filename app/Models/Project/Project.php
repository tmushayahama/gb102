<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\AppType\AppType;
use Request;
use DB;
use JWTAuth;

class Project extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_project';
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

 public static function getProjectsAll() {
  $projects = Project::orderBy('id', 'desc')
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
  return $projects;
 }

 public static function getSubProjects($projectId) {
  $projects = Project::orderBy('id', 'desc')
          ->with('explorer')
          ->with('mentor')
          ->with('mentee')
          ->whereHas('explorer', function($q) use ($projectId) {
           $q->where('parent_explorer_id', $projectId);
          })
          ->with('explorer.app_type')
          ->with('explorer.creator')
          ->with('explorer.icon')
          ->with('explorer.level')
          ->take(100)
          ->get();
  return $projects;
 }

 public static function getProjects($appName) {
  $appId = AppType::where('name', $appName)->first();
  if ($appId) {
   $projects = Project::where('app_type_id', $appId->id)
           ->orderBy('id', 'desc')
           ->with('explorer')
           ->with('explorer.app_type')
           ->with('explorer.creator')
           ->with('explorer.icon')
           ->with('explorer.level')
           ->take(100)
           ->get();
  }
  return $projects;
 }

 public static function getProjectsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projects = Project::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('app_type')
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(50)
          ->get();
  return $projects;
 }

 public static function getProject($id) {
  $project = Project::with('creator')
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
  return $project; //$project;
 }

 public static function createProject() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $appTypeId = Request::get("app_type_id");
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $project = new Project;
  $project->creator_id = $userId;
  $project->app_type_id = $appTypeId;
  $project->title = $title;
  $project->description = $description;
  $project->level_id = $levelId;

  DB::beginTransaction();
  try {
   $project->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $project;
 }

 public static function editProject() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectId = Request::get("projectId");
  $title = Request::get("title");
  $description = Request::get("description");
  $project = Project::find($projectId);
  $project->title = $title;
  $project->description = $description;

  DB::beginTransaction();
  try {
   $project->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $project;
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
