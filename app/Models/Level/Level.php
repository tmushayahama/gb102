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
  return $this->belongsTo('App\Models\Level', 'level_id');
 }

 public static $level_categories = array(
     'request_type_offset' => 1000,
     'skills' => 1,
     'goals' => 2,
     'hobbies' => 3,
     'promises' => 4,
     'mentorships' => 5,
     'collaborations' => 6,
     'teach' => 7,
     'advices' => 8,
     'groups' => 9,
     'journals' => 10,
     'request_type_skill' => 1001,
     'request_type_goal' => 1002,
     'todo_level_normal' => 50000,
     'todo_level_progress' => 50001,
     'todo_status_in_progress' => 50100,
     'todo_status_later' => 50101,
     'todo_status_done' => 50102,
     'contribution_types' => 60000,
     'explorer_relationship' => array(
         'parent' => 200000,
         'application' => 200001
     ),
     'list' => array(
         'handpicked' => 1
     ),
     'share' => array(
         'explorer' => 300000,
         'notes' => 300001,
     ),
     'privacy' => array(
         'private' => 500000,
         'public' => 500001,
         'customize' => 500002,
     )
 );

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getLevel($category) {
  $levels = Level::orderBy('id', 'asc')
          ->where('category', $category)
          ->get();
  return $levels;
 }

 public static function getLevelByCode($code) {
  $levels = Level::orderBy('id', 'asc')
          ->where('code', $code)
          ->get();
  return $levels;
 }

}
