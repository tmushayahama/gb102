<?php

namespace App\Http\Controllers\Skill;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Skill\Skill;
use App\Models\Skill\SkillComment;
use App\Models\Skill\SkillNote;
use App\Models\Skill\SkillTodo;
use App\Models\Skill\SkillWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
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

 /* TODOS */

 public function getSkillTodos($skillId) {
  $skillTodos = SkilLTodo::getSkillTodos($skillId);
  return \Response::json($skillTodos);
 }

 public function getSkillTodo($skillId, $todoId) {
  $skillTodo = SkilLTodo::getSkillTodo($skillId, $todoId);
  return \Response::json($skillTodo);
 }

 public function createSkillTodo() {
  $skillTodo = SkilLTodo::createSkillTodo();
  return \Response::json($skillTodo);
 }

 public function editSkillTodo() {
  $skillTodo = SkilLTodo::editSkillTodo();
  return \Response::json($skillTodo);
 }

 public function getSkillTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createSkillTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editSkillTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getSkillNotes($skillId) {
  $skillNotes = SkilLNote::getSkillNotes($skillId);
  return \Response::json($skillNotes);
 }

 public function getSkillNote($skillId, $noteId) {
  $skillNote = SkilLNote::getSkillNote($skillId, $noteId);
  return \Response::json($skillNote);
 }

 public function createSkillNote() {
  $skillNote = SkilLNote::createSkillNote();
  return \Response::json($skillNote);
 }

 public function editSkillNote() {
  $skillNote = SkilLNote::editSkillNote();
  return \Response::json($skillNote);
 }

 public function getSkillComments($skillId) {
  $skillComments = SkilLComment::getSkillComments($skillId);
  return \Response::json($skillComments);
 }

 public function getSkillComment($skillId, $commentId) {
  $skillComment = SkilLComment::getSkillComment($skillId, $commentId);
  return \Response::json($skillComment);
 }

 public function createSkillComment() {
  $skillComment = SkilLComment::createSkillComment();
  return \Response::json($skillComment);
 }

 public function editSkillComment() {
  $skillComment = SkilLComment::editSkillComment();
  return \Response::json($skillComment);
 }

 public function getSkillWeblinks($skillId) {
  $skillWeblinks = SkilLWeblink::getSkillWeblinks($skillId);
  return \Response::json($skillWeblinks);
 }

 public function getSkillWeblink($skillId, $weblinkId) {
  $skillWeblink = SkilLWeblink::getSkillWeblink($skillId, $weblinkId);
  return \Response::json($skillWeblink);
 }

 public function createSkillWeblink() {
  $skillWeblink = SkilLWeblink::createSkillWeblink();
  return \Response::json($skillWeblink);
 }

 public function editSkillWeblink() {
  $skillWeblink = SkilLWeblink::editSkillWeblink();
  return \Response::json($skillWeblink);
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
