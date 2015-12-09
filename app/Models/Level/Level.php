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

}
