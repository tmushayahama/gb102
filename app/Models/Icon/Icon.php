<?php

namespace App\Models\Icon;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Icon extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_icon';

 public static function getIcons($type) {
  $icons = Icon::orderBy('id', 'asc')
          ->where('type', $type)
          ->get();
  return $icons;
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

}
