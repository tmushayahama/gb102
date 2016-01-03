<?php

namespace App\Models\Community;

use Illuminate\Database\Eloquent\Model;
use App\Models\Todo\Todo;
use Request;
use DB;
use JWTAuth;

class CommunityTodo extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_community_todo';
 public $timestamps = false;

 public function community() {
  return $this->belongsTo('App\Models\Community\Community', 'community_id');
 }

 public function todo() {
  return $this->belongsTo('App\Models\Todo\Todo', 'todo_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

 public static function getCommunityTodos($communityId) {
  $communityTodos = CommunityTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->get();
  return $communityTodos;
 }

 public static function getCommunityTodo($communityId, $todoId) {
  $communityTodo = CommunityTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('community_id', $communityId)
    ->where('todo_id', $todoId)
    ->first();
  return $communityTodo;
 }

 public static function createCommunityTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityId = Request::get("communityId");
  $title = Request::get("title");
  $description = Request::get("description");
  $todo = new Todo;
  $communityTodo = new CommunityTodo;
  $todo->creator_id = $userId;
  $todo->title = $title;
  $todo->description = $description;
  $communityTodo->community_id = $communityId;

  DB::beginTransaction();
  try {
   $todo->save();
   $communityTodo->todo()->associate($todo);
   $communityTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityTodo;
 }

 public static function editCommunityTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $communityTodoId = Request::get("communityTodoId");
  //$todoId = Request::get("todoId");
  $title = Request::get("title");
  $description = Request::get("description");
  $communityTodo = CommunityTodo::find($communityTodoId);
  $communityTodo->todo->title = $title;
  $communityTodo->todo->description = $description;

  DB::beginTransaction();
  try {
   $communityTodo->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $communityTodo;
 }

}
