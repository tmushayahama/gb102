<?php

namespace App\Models\Plan;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Plan extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_plan';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function objective() {
  return $this->belongsTo('App\Models\Objective\Objective', 'objective_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

}
