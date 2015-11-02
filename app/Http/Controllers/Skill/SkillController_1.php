<?php

namespace App\Http\Controllers\Skill;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Skill\Skill;
use App\Models\Skill\SkillTodo;
use App\Models\Todo\Todo;
use Request;
use DB;

class SkillController extends Controller {

 public function getSkills() {
  $skills = Skill::orderBy('id', 'desc')
    ->take(10)
    ->get();
  /*
    $skills = Skill::where('creator_id', $userId)
    ->orderBy('id', 'desc')
    ->take(10)
    ->get(); */
  return \Response::json($skills);
 }

 public function getSkill($id) {
  // $id = Request::get("id");
  $skill = Skill::with('creator')
    ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $skill; //$skill;
 }

 public function getSkillTodos($skillId) {
  $skillTodos = SkillTodo::with('todo')
    ->orderBy('id', 'DESC')
    ->where('skill_id', $skillId)
    ->get();
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $skillTodos; //$skill;
 }

 public function createSkillTodo() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $skillId = Request::get("skillId");
  $description = Request::get("description");
  $todo = new Todo;
  $skillTodo = new SkillTodo;
  $todo->creator_id = $userId;
  $todo->description = $description;
  $skillTodo->skill_id = $skillId;

  DB::beginTransaction();
  try {
   $todo->save();
   $skillTodo->todo()->associate($todo);
   $skillTodo->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $skillTodo;
 }

 public function getSkillTimeline($id) {
  // $id = Request::get("id");
  $skill = Skill::with('creator')
    ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $skill; //$skill;
 }

 public function getSkillt($id) {
  $skill = Skill::find($id);
  $user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $user; //$skill;
 }

 /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  */
 public function index() {
  //
 }

 /**
  * Show the form for creating a new resource.
  *
  * @return \Illuminate\Http\Response
  */
 public function create() {
  //
 }

 /**
  * Store a newly created resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @return \Illuminate\Http\Response
  */
 public function store(Request $request) {
  //
 }

 /**
  * Display the specified resource.
  *
  * @param  int  $id
  * @return \Illuminate\Http\Response
  */
 public function show($id) {
  //
 }

 /**
  * Show the form for editing the specified resource.
  *
  * @param  int  $id
  * @return \Illuminate\Http\Response
  */
 public function edit($id) {
  //
 }

 /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @param  int  $id
  * @return \Illuminate\Http\Response
  */
 public function update(Request $request, $id) {
  //
 }

 /**
  * Remove the specified resource from storage.
  *
  * @param  int  $id
  * @return \Illuminate\Http\Response
  */
 public function destroy($id) {
  //
 }

}
