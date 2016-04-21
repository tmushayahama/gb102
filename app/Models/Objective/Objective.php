<?php

namespace App\Models\Objective;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Objective extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_objective';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

}
