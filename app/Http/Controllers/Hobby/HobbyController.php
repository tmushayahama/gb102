<?php

namespace App\Http\Controllers\Hobby;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Hobby\Hobby;
use App\Models\Hobby\HobbyTimeline;
use App\Models\Hobby\HobbyComment;
use App\Models\Hobby\HobbyNote;
use App\Models\Hobby\HobbyTodo;
use App\Models\Hobby\HobbyWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use Request;
use DB;

class HobbyController extends Controller {

 public function getHobbysAll() {
  $hobbys = Hobby::getHobbysAll();
  return \Response::json($hobbys);
 }

 public function getHobbysMine() {
  $hobbys = Hobby::getHobbysMine();
  return \Response::json($hobbys);
 }

 public function getHobby($id) {
  $hobby = Hobby::getHobby($id);
  return \Response::json($hobby);
 }

 public function createHobby() {
  $hobby = Hobby::createHobby();
  return \Response::json($hobby);
 }

 public function editHobby() {
  $hobby = Hobby::editHobby();
  return \Response::json($hobby);
 }

 public function getHobbyTimelines($hobbyId) {
  $hobbyTimelines = HobbyTimeline::getHobbyTimelines($hobbyId);
  return \Response::json($hobbyTimelines);
 }

 public function getHobbyTimeline($hobbyId, $timelineId) {
  $hobbyTimeline = HobbyTimeline::getHobbyTimeline($hobbyId, $timelineId);
  return \Response::json($hobbyTimeline);
 }

 public function createHobbyTimeline() {
  $hobbyTimeline = HobbyTimeline::createHobbyTimeline();
  return \Response::json($hobbyTimeline);
 }

 public function editHobbyTimeline() {
  $hobbyTimeline = HobbyTimeline::editHobbyTimeline();
  return \Response::json($hobbyTimeline);
 }

 /* TODOS */

 public function getHobbyTodos($hobbyId) {
  $hobbyTodos = HobbyTodo::getHobbyTodos($hobbyId);
  return \Response::json($hobbyTodos);
 }

 public function getHobbyTodo($hobbyId, $todoId) {
  $hobbyTodo = HobbyTodo::getHobbyTodo($hobbyId, $todoId);
  return \Response::json($hobbyTodo);
 }

 public function createHobbyTodo() {
  $hobbyTodo = HobbyTodo::createHobbyTodo();
  return \Response::json($hobbyTodo);
 }

 public function editHobbyTodo() {
  $hobbyTodo = HobbyTodo::editHobbyTodo();
  return \Response::json($hobbyTodo);
 }

 public function getHobbyTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createHobbyTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editHobbyTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getHobbyNotes($hobbyId) {
  $hobbyNotes = HobbyNote::getHobbyNotes($hobbyId);
  return \Response::json($hobbyNotes);
 }

 public function getHobbyNote($hobbyId, $noteId) {
  $hobbyNote = HobbyNote::getHobbyNote($hobbyId, $noteId);
  return \Response::json($hobbyNote);
 }

 public function createHobbyNote() {
  $hobbyNote = HobbyNote::createHobbyNote();
  return \Response::json($hobbyNote);
 }

 public function editHobbyNote() {
  $hobbyNote = HobbyNote::editHobbyNote();
  return \Response::json($hobbyNote);
 }

 public function getHobbyComments($hobbyId) {
  $hobbyComments = HobbyComment::getHobbyComments($hobbyId);
  return \Response::json($hobbyComments);
 }

 public function getHobbyComment($hobbyId, $commentId) {
  $hobbyComment = HobbyComment::getHobbyComment($hobbyId, $commentId);
  return \Response::json($hobbyComment);
 }

 public function createHobbyComment() {
  $hobbyComment = HobbyComment::createHobbyComment();
  return \Response::json($hobbyComment);
 }

 public function editHobbyComment() {
  $hobbyComment = HobbyComment::editHobbyComment();
  return \Response::json($hobbyComment);
 }

 public function getHobbyWeblinks($hobbyId) {
  $hobbyWeblinks = HobbyWeblink::getHobbyWeblinks($hobbyId);
  return \Response::json($hobbyWeblinks);
 }

 public function getHobbyWeblink($hobbyId, $weblinkId) {
  $hobbyWeblink = HobbyWeblink::getHobbyWeblink($hobbyId, $weblinkId);
  return \Response::json($hobbyWeblink);
 }

 public function createHobbyWeblink() {
  $hobbyWeblink = HobbyWeblink::createHobbyWeblink();
  return \Response::json($hobbyWeblink);
 }

 public function editHobbyWeblink() {
  $hobbyWeblink = HobbyWeblink::editHobbyWeblink();
  return \Response::json($hobbyWeblink);
 }

}
