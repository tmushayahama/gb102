<?php

namespace App\Models\Collaboration;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Collaboration extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_collaboration';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function icon() {
  return $this->belongsTo('App\Models\Icon\Icon', 'icon_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getCollaborationsAll() {
  $collaborations = Collaboration::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $collaborations;
 }

 public static function getCollaborationsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborations = Collaboration::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $collaborations;
 }

 public static function getCollaboration($id) {
  $collaboration = Collaboration::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $collaboration; //$collaboration;
 }

 public static function createCollaboration() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $collaboration = new Collaboration;
  $collaboration->creator_id = $userId;
  $collaboration->title = $title;
  $collaboration->description = $description;
  $collaboration->level_id = $levelId;

  DB::beginTransaction();
  try {
   $collaboration->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaboration;
 }

 public static function editCollaboration() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $collaborationId = Request::get("collaborationId");
  $title = Request::get("title");
  $description = Request::get("description");
  $collaboration = Collaboration::find($collaborationId);
  $collaboration->title = $title;
  $collaboration->description = $description;

  DB::beginTransaction();
  try {
   $collaboration->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $collaboration;
 }

}
