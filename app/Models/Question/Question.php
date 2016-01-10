<?php

namespace App\Models\Question;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Question extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_question';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description'];

}
