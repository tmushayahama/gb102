<?php

namespace App\Models\Contributor;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Contributor extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_contributor';

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
