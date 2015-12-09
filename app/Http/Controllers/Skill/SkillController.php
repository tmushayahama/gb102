<?php

namespace App\Http\Controllers\Skill;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Skill\Skill;
use App\Models\Skill\SkillTimeline;
use App\Models\Skill\SkillComment;
use App\Models\Skill\SkillNote;
use App\Models\Skill\SkillTodo;
use App\Models\Skill\SkillWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
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

 public function createSkill() {
  $skill = Skill::createSkill();
  return \Response::json($skill);
 }

 public function editSkill() {
  $skill = Skill::editSkill();
  return \Response::json($skill);
 }

 public function getSkillTimelines($skillId) {
  $skillTimelines = SkillTimeline::getSkillTimelines($skillId);
  return \Response::json($skillTimelines);
 }

 public function getSkillTimeline($skillId, $timelineId) {
  $skillTimeline = SkillTimeline::getSkillTimeline($skillId, $timelineId);
  return \Response::json($skillTimeline);
 }

 public function createSkillTimeline() {
  $skillTimeline = SkillTimeline::createSkillTimeline();
  return \Response::json($skillTimeline);
 }

 public function editSkillTimeline() {
  $skillTimeline = SkillTimeline::editSkillTimeline();
  return \Response::json($skillTimeline);
 }

 /* TODOS */

 public function getSkillTodos($skillId) {
  $skillTodos = SkillTodo::getSkillTodos($skillId);
  return \Response::json($skillTodos);
 }

 public function getSkillTodo($skillId, $todoId) {
  $skillTodo = SkillTodo::getSkillTodo($skillId, $todoId);
  return \Response::json($skillTodo);
 }

 public function createSkillTodo() {
  $skillTodo = SkillTodo::createSkillTodo();
  return \Response::json($skillTodo);
 }

 public function editSkillTodo() {
  $skillTodo = SkillTodo::editSkillTodo();
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
  $skillNotes = SkillNote::getSkillNotes($skillId);
  return \Response::json($skillNotes);
 }

 public function getSkillNote($skillId, $noteId) {
  $skillNote = SkillNote::getSkillNote($skillId, $noteId);
  return \Response::json($skillNote);
 }

 public function createSkillNote() {
  $skillNote = SkillNote::createSkillNote();
  return \Response::json($skillNote);
 }

 public function editSkillNote() {
  $skillNote = SkillNote::editSkillNote();
  return \Response::json($skillNote);
 }

 public function getSkillComments($skillId) {
  $skillComments = SkillComment::getSkillComments($skillId);
  return \Response::json($skillComments);
 }

 public function getSkillComment($skillId, $commentId) {
  $skillComment = SkillComment::getSkillComment($skillId, $commentId);
  return \Response::json($skillComment);
 }

 public function createSkillComment() {
  $skillComment = SkillComment::createSkillComment();
  return \Response::json($skillComment);
 }

 public function editSkillComment() {
  $skillComment = SkillComment::editSkillComment();
  return \Response::json($skillComment);
 }

 public function getSkillWeblinks($skillId) {
  $skillWeblinks = SkillWeblink::getSkillWeblinks($skillId);
  return \Response::json($skillWeblinks);
 }

 public function getSkillWeblink($skillId, $weblinkId) {
  $skillWeblink = SkillWeblink::getSkillWeblink($skillId, $weblinkId);
  return \Response::json($skillWeblink);
 }

 public function createSkillWeblink() {
  $skillWeblink = SkillWeblink::createSkillWeblink();
  return \Response::json($skillWeblink);
 }

 public function editSkillWeblink() {
  $skillWeblink = SkillWeblink::editSkillWeblink();
  return \Response::json($skillWeblink);
 }

}
