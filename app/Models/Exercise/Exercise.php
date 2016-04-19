<?php

namespace App\Models\Exercise;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Exercise extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_exercise';

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
