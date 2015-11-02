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
  $skills = Skill::getSkills();
  return \Response::json($skills);
 }

 public function getSkill($id) {
  $skill = Skill::getSkill($id);
  return \Response::json($skill);
 }

 public function getSkillTodos($skillId) {
  $skillTodos = SkilLTodo::getSkillTodos($skillId);
  return \Response::json($skillTodos);
 }

 public function createSkillTodo() {
  $skillTodos = SkilLTodo::createSkillTodo();
  return \Response::json($skillTodos);
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

}
