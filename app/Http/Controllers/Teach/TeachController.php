<?php

namespace App\Http\Controllers\Teach;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Teach\Teach;
use App\Models\Teach\TeachTimeline;
use App\Models\Teach\TeachComment;
use App\Models\Teach\TeachNote;
use App\Models\Teach\TeachTodo;
use App\Models\Teach\TeachWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Teach\TeachSwipe;
use Request;
use DB;

class TeachController extends Controller {

 public function getTeachsAll() {
  $teachs = Teach::getTeachsAll();
  return \Response::json($teachs);
 }

 public function getTeachsMine() {
  $teachs = Teach::getTeachsMine();
  return \Response::json($teachs);
 }

 public function getTeach($id) {
  $teach = Teach::getTeach($id);
  return \Response::json($teach);
 }

 public function createTeach() {
  $teach = Teach::createTeach();
  return \Response::json($teach);
 }

 public function editTeach() {
  $teach = Teach::editTeach();
  return \Response::json($teach);
 }

 public function getTeachTimelines($teachId) {
  $teachTimelines = TeachTimeline::getTeachTimelines($teachId);
  return \Response::json($teachTimelines);
 }

 public function getTeachTimeline($teachId, $timelineId) {
  $teachTimeline = TeachTimeline::getTeachTimeline($teachId, $timelineId);
  return \Response::json($teachTimeline);
 }

 public function createTeachTimeline() {
  $teachTimeline = TeachTimeline::createTeachTimeline();
  return \Response::json($teachTimeline);
 }

 public function editTeachTimeline() {
  $teachTimeline = TeachTimeline::editTeachTimeline();
  return \Response::json($teachTimeline);
 }

 /* TODOS */

 public function getTeachTodos($teachId) {
  $teachTodos = TeachTodo::getTeachTodos($teachId);
  return \Response::json($teachTodos);
 }

 public function getTeachTodo($teachId, $todoId) {
  $teachTodo = TeachTodo::getTeachTodo($teachId, $todoId);
  return \Response::json($teachTodo);
 }

 public function createTeachTodo() {
  $teachTodo = TeachTodo::createTeachTodo();
  return \Response::json($teachTodo);
 }

 public function editTeachTodo() {
  $teachTodo = TeachTodo::editTeachTodo();
  return \Response::json($teachTodo);
 }

 public function getTeachTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createTeachTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editTeachTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getTeachNotes($teachId) {
  $teachNotes = TeachNote::getTeachNotes($teachId);
  return \Response::json($teachNotes);
 }

 public function getTeachNote($teachId, $noteId) {
  $teachNote = TeachNote::getTeachNote($teachId, $noteId);
  return \Response::json($teachNote);
 }

 public function createTeachNote() {
  $teachNote = TeachNote::createTeachNote();
  return \Response::json($teachNote);
 }

 public function editTeachNote() {
  $teachNote = TeachNote::editTeachNote();
  return \Response::json($teachNote);
 }

 public function getTeachComments($teachId) {
  $teachComments = TeachComment::getTeachComments($teachId);
  return \Response::json($teachComments);
 }

 public function getTeachComment($teachId, $commentId) {
  $teachComment = TeachComment::getTeachComment($teachId, $commentId);
  return \Response::json($teachComment);
 }

 public function createTeachComment() {
  $teachComment = TeachComment::createTeachComment();
  return \Response::json($teachComment);
 }

 public function editTeachComment() {
  $teachComment = TeachComment::editTeachComment();
  return \Response::json($teachComment);
 }

 public function getTeachWeblinks($teachId) {
  $teachWeblinks = TeachWeblink::getTeachWeblinks($teachId);
  return \Response::json($teachWeblinks);
 }

 public function getTeachWeblink($teachId, $weblinkId) {
  $teachWeblink = TeachWeblink::getTeachWeblink($teachId, $weblinkId);
  return \Response::json($teachWeblink);
 }

 public function createTeachWeblink() {
  $teachWeblink = TeachWeblink::createTeachWeblink();
  return \Response::json($teachWeblink);
 }

 public function editTeachWeblink() {
  $teachWeblink = TeachWeblink::editTeachWeblink();
  return \Response::json($teachWeblink);
 }

 //SWIPE
 public function getTeachSwipes() {
  $teachSwipes = TeachSwipe::getTeachSwipes();
  return \Response::json($teachSwipes);
 }

 public function getTeachSwipe() {
  $teachSwipe = TeachSwipe::getTeachSwipe();
  return \Response::json($teachSwipe);
 }

 public function createTeachSwipe() {
  $teachSwipe = TeachSwipe::createTeachSwipe();
  return \Response::json($teachSwipe);
 }

}
