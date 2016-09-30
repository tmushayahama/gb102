<?php

namespace App\Models\Level;

use Illuminate\Database\Eloquent\Model;
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

 public function level() {
  return $this->belongsTo('App\Models\Level', 'parent_level_id');
 }

 public static $level_categories = array(
     'apps' => 1,
     'skills' => 2,
     'goals' => 3,
     'hobbies' => 4,
     'promises' => 5,
     'mentorships' => 6,
     'collaborations' => 7,
     'teach' => 8,
     'advices' => 9,
     'groups' => 10,
     'journals' => 11,
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
     'privacy' => array(
         'private' => 10001,
         'public' => 10002,
         'customize' => 10003,
     ),
     'component_background_colors' => 13000,
     'default_component_background_color' => 13001
 );

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getLevels() {
  $levels = Level::orderBy('id', 'asc')
          ->get();
  $levelsArray = array();
  foreach ($levels as $level) {
   $levelsArray[$level->title] = $level->id;
  }
  return $levelsArray;
 }

 public static function getLevel($parentId) {
  $levels = Level::orderBy('id', 'asc')
          ->where('parent_level_id', $parentId)
          ->get();
  return $levels;
 }

}
