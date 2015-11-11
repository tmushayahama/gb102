<?php

namespace App\Models\Checklist;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Checklist extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_checklist';

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
