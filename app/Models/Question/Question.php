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

 public static function getQuestion($id) {
  $question = Question::with('creator')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $question; //$question;
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description'];

}
