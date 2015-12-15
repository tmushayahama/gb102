<?php

namespace App\Models\Promise;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Promise extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_promise';

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
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getPromisesAll() {
  $promises = Promise::orderBy('id', 'desc')
    ->with('creator')
    ->with('level')
    ->take(10)
    ->get();
  return $promises;
 }

 public static function getPromisesMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promises = Promise::orderBy('id', 'desc')
    ->where('creator_id', $userId)
    ->with('creator')
    ->with('level')
    ->take(10)
    ->get();
  return $promises;
 }

 public static function getPromise($id) {
  $promise = Promise::with('creator')
    ->with('level')
    ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $promise; //$promise;
 }

 public static function createPromise() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $promise = new Promise;
  $promise->creator_id = $userId;
  $promise->title = $title;
  $promise->description = $description;
  $promise->level_id = $levelId;

  DB::beginTransaction();
  try {
   $promise->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promise;
 }

 public static function editPromise() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $promiseId = Request::get("promiseId");
  $title = Request::get("title");
  $description = Request::get("description");
  $promise = Promise::find($promiseId);
  $promise->title = $title;
  $promise->description = $description;

  DB::beginTransaction();
  try {
   $promise->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $promise;
 }

}
