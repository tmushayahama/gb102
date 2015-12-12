<?php

namespace App\Http\Controllers\Promise;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Promise\Promise;
use App\Models\Promise\PromiseTimeline;
use App\Models\Promise\PromiseComment;
use App\Models\Promise\PromiseNote;
use App\Models\Promise\PromiseTodo;
use App\Models\Promise\PromiseWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use Request;
use DB;

class PromiseController extends Controller {

 public function getPromises() {
  $promises = Promise::getPromises();
  return \Response::json($promises);
 }

 public function getPromise($id) {
  $promise = Promise::getPromise($id);
  return \Response::json($promise);
 }

 public function createPromise() {
  $promise = Promise::createPromise();
  return \Response::json($promise);
 }

 public function editPromise() {
  $promise = Promise::editPromise();
  return \Response::json($promise);
 }

 public function getPromiseTimelines($promiseId) {
  $promiseTimelines = PromiseTimeline::getPromiseTimelines($promiseId);
  return \Response::json($promiseTimelines);
 }

 public function getPromiseTimeline($promiseId, $timelineId) {
  $promiseTimeline = PromiseTimeline::getPromiseTimeline($promiseId, $timelineId);
  return \Response::json($promiseTimeline);
 }

 public function createPromiseTimeline() {
  $promiseTimeline = PromiseTimeline::createPromiseTimeline();
  return \Response::json($promiseTimeline);
 }

 public function editPromiseTimeline() {
  $promiseTimeline = PromiseTimeline::editPromiseTimeline();
  return \Response::json($promiseTimeline);
 }

 /* TODOS */

 public function getPromiseTodos($promiseId) {
  $promiseTodos = PromiseTodo::getPromiseTodos($promiseId);
  return \Response::json($promiseTodos);
 }

 public function getPromiseTodo($promiseId, $todoId) {
  $promiseTodo = PromiseTodo::getPromiseTodo($promiseId, $todoId);
  return \Response::json($promiseTodo);
 }

 public function createPromiseTodo() {
  $promiseTodo = PromiseTodo::createPromiseTodo();
  return \Response::json($promiseTodo);
 }

 public function editPromiseTodo() {
  $promiseTodo = PromiseTodo::editPromiseTodo();
  return \Response::json($promiseTodo);
 }

 public function getPromiseTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createPromiseTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editPromiseTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getPromiseNotes($promiseId) {
  $promiseNotes = PromiseNote::getPromiseNotes($promiseId);
  return \Response::json($promiseNotes);
 }

 public function getPromiseNote($promiseId, $noteId) {
  $promiseNote = PromiseNote::getPromiseNote($promiseId, $noteId);
  return \Response::json($promiseNote);
 }

 public function createPromiseNote() {
  $promiseNote = PromiseNote::createPromiseNote();
  return \Response::json($promiseNote);
 }

 public function editPromiseNote() {
  $promiseNote = PromiseNote::editPromiseNote();
  return \Response::json($promiseNote);
 }

 public function getPromiseComments($promiseId) {
  $promiseComments = PromiseComment::getPromiseComments($promiseId);
  return \Response::json($promiseComments);
 }

 public function getPromiseComment($promiseId, $commentId) {
  $promiseComment = PromiseComment::getPromiseComment($promiseId, $commentId);
  return \Response::json($promiseComment);
 }

 public function createPromiseComment() {
  $promiseComment = PromiseComment::createPromiseComment();
  return \Response::json($promiseComment);
 }

 public function editPromiseComment() {
  $promiseComment = PromiseComment::editPromiseComment();
  return \Response::json($promiseComment);
 }

 public function getPromiseWeblinks($promiseId) {
  $promiseWeblinks = PromiseWeblink::getPromiseWeblinks($promiseId);
  return \Response::json($promiseWeblinks);
 }

 public function getPromiseWeblink($promiseId, $weblinkId) {
  $promiseWeblink = PromiseWeblink::getPromiseWeblink($promiseId, $weblinkId);
  return \Response::json($promiseWeblink);
 }

 public function createPromiseWeblink() {
  $promiseWeblink = PromiseWeblink::createPromiseWeblink();
  return \Response::json($promiseWeblink);
 }

 public function editPromiseWeblink() {
  $promiseWeblink = PromiseWeblink::editPromiseWeblink();
  return \Response::json($promiseWeblink);
 }

}
