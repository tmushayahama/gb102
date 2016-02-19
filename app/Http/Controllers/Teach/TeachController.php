<?php

namespace App\Http\Controllers\Teach;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Teach\Teach;
use App\Models\Teach\TeachProgress;
use App\Models\Teach\TeachComment;
use App\Models\Teach\TeachNote;
use App\Models\Teach\TeachTodo;
use App\Models\Teach\TeachWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Progress\Progress;
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

 public function getSubTeachs($teachId) {
  $teachs = Teach::getSubTeachs($teachId);
  return \Response::json($teachs);
 }

 public function getTeachs($appName) {
  $teachs = Teach::getTeachs($appName);
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

 public function getTeachProgress($teachId) {
  $teachProgress = TeachProgress::getTeachProgress($teachId);
  return \Response::json($teachProgress);
 }

 public function getTeachProgressItem($teachId, $progressId) {
  $teachProgress = TeachProgress::getTeachProgress($teachId, $progressId);
  return \Response::json($teachProgress);
 }

 public function createTeachProgress() {
  $teachProgress = TeachProgress::createTeachProgress();
  return \Response::json($teachProgress);
 }

 public function editTeachProgress() {
  $teachProgress = TeachProgress::editTeachProgress();
  return \Response::json($teachProgress);
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
