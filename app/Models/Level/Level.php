<?php

namespace App\Models\Level;

use Illuminate\Database\Eloquent\Model;
use App\Models\Component\Component;
use Request;
use DB;
use JWTAuth;

class Level extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_level';

 /**
  *
  * @return type
  */
 public function level() {
  return $this->belongsTo('App\Models\Level', 'parent_level_id');
 }

 public static $level_categories = array(
     'apps' => 1,
     'skill' => 2,
     'goal' => 3,
     'hobby' => 4,
     'promise' => 5,
     'mentorship' => 6,
     'collaboration' => 7,
     'teach' => 8,
     'advice' => 9,
     'group' => 10,
     'journal' => 11,
     'page' => 12,
     'project' => 13,
     'question' => 11100,
     'request_type_skill' => 1001,
     'request_type_goal' => 1002,
     'todo_level_normal' => 50000,
     'todo_level_progress' => 50001,
     'todo_status_in_progress' => 50100,
     'todo_status_later' => 50101,
     'todo_status_done' => 50102,
     'contribution_types' => 4000,
     'explorer_relationship' => array(
         'parent' => 6001,
         'application' => 6002
     ),
     'list' => array(
         'handpicked' => 1
     ),
     'share' => array(
         'explorer' => 300000,
         'notes' => 300001,
     ),
     'template_types' => array(
         'basic' => 7001,
         'template' => 7002
     ),
     'status' => array(
         'pending' => 5001,
         'accepted' => 5002
     ),
     'privacy' => array(
         'private' => 10001,
         'public' => 10002,
         'customize' => 10003,
     ),
     "recommendation_setup" => array(
         "samples" => 13001
     ),
     "mentorship_request_type" => array(
         "mentor" => 17001,
         "mentee" => 17002,
     ),
     "mentorship_status" => array(
         "pending" => 18001,
         "active" => 18002,
         "inactive" => 18003
     ),
     "matcher_answer" => array(
         "normal" => 19001,
     ),
     'template_type' => 7000,
     'component_types' => 11000,
     'recommendation' => 12000,
     'default_component_background_color' => 13001,
     "component_motives" => 14000,
     "mentorship_request_types" => 17000
 );
 public static $componentJsonFormat = array(
     "subcomponents" => 1,
     "types" => 2,
     "columns" => 3,
     "linear" => 4,
     "recommendations" => 5,
     "tree" => 4
 );

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getLevel($id, $withCount = false) {
  $levels = Level::find($id);

  if ($withCount) {
   $level["count"] = Component::where("type_id", $level->id)->count();
  }
  return $levels;
 }

 public static function getLevels() {
  $levels = Level::orderBy('id', 'asc')
          ->get();
  $levelsArray = array();
  foreach ($levels as $level) {
   $levelsArray[$level->title] = $level->id;
  }
  return $levelsArray;
 }

 public static function getSubLevels($parentId, $withCount = false) {
  $levels = Level::orderBy('id', 'asc')
          ->where('parent_level_id', $parentId)
          ->get();

  if ($withCount) {
   foreach ($levels as $level) {
    $level["count"] = Component::where("type_id", $level->id)->count();
   }
  }
  return $levels;
 }

 public static function getConstants() {
  $levels = Level::orderBy('id', 'asc')
          ->whereNull('parent_level_id')
          ->get();
  $config = array();
  foreach ($levels as $level) {
   $config[$level->id] = Level::orderBy('id', 'asc')
           ->where('parent_level_id', $level->id)
           ->get();
  }

  return $config;
 }

 public static function getComponentTypes() {
  $result = array();
  $result['apps'] = Level::getSubLevels(Level::$level_categories['apps'], true);
  $result['activities'] = Level::getSubLevels(Level::$level_categories['component_types'], true);
  $result['motives'] = Level::getSubLevels(Level::$level_categories['component_motives'], true);
  $result['mentorshipRequestTypes'] = Level::getSubLevels(Level::$level_categories['mentorship_request_types'], true);
  $result['contributionTypes'] = Level::getSubLevels(Level::$level_categories['contribution_types'], true);
  return $result;
 }

}
