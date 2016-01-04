<?php

namespace App\Models\AppType;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class AppType extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_app_type';

 public function appType() {
  return $this->belongsTo('App\Models\AppType', 'app_type_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'app_type_id'];

 public static function getAppTypes() {
  $appTypes = AppType::orderBy('id', 'asc')
          ->get();
  return $appTypes;
 }

}
