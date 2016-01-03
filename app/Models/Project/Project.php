<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
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

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function icon() {
  return $this->belongsTo('App\Models\Icon\Icon', 'icon_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getProjectsAll() {
  $projects = Project::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $projects;
 }

 public static function getProjectsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projects = Project::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $projects;
 }

 public static function getProject($id) {
  $project = Project::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $project; //$project;
 }

 public static function createProject() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $project = new Project;
  $project->creator_id = $userId;
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

}
