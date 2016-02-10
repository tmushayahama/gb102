<?php

namespace App\Models\Project;

use Illuminate\Database\Eloquent\Model;
use App\Models\Weblink\Weblink;
use Request;
use DB;
use JWTAuth;

class ProjectWeblink extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_project_weblink';
 public $timestamps = false;

 public function project() {
  return $this->belongsTo('App\Models\Project\Project', 'project_id');
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

 public static function getProjectWeblinks($projectId) {
  $projectWeblinks = ProjectWeblink::with('weblink')
    ->with('weblink.creator')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->get();
  return $projectWeblinks;
 }

 public static function getProjectWeblink($projectId, $weblinkId) {
  $projectWeblink = ProjectWeblink::with('weblink')
    ->orderBy('id', 'DESC')
    ->where('project_id', $projectId)
    ->where('weblink_id', $weblinkId)
    ->first();
  return $projectWeblink;
 }

 public static function createProjectWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectId = Request::get("projectId");
  $title = Request::get("title");
  $description = Request::get("description");
  $weblink = new Weblink;
  $projectWeblink = new ProjectWeblink;
  $weblink->creator_id = $userId;
  $weblink->title = $title;
  $projectWeblink->project_id = $projectId;

  DB::beginTransaction();
  try {
   $weblink->save();
   $projectWeblink->weblink()->associate($weblink);
   $projectWeblink->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectWeblink;
 }

 public static function editProjectWeblink() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $projectWeblinkId = Request::get("projectWeblinkId");
  //$weblinkId = Request::get("weblinkId");
  $title = Request::get("title");
  $description = Request::get("description");
  $projectWeblink = ProjectWeblink::find($projectWeblinkId);
  $projectWeblink->weblink->title = $title;
  $projectWeblink->weblink->description = $description;

  DB::beginTransaction();
  try {
   $projectWeblink->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $projectWeblink;
 }

}
