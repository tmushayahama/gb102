<?php

namespace App\Http\Controllers\Advice;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Advice\Advice;
use App\Models\Advice\AdviceTimeline;
use App\Models\Advice\AdviceComment;
use App\Models\Advice\AdviceNote;
use App\Models\Advice\AdviceTodo;
use App\Models\Advice\AdviceWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Advice\AdviceSwipe;
use Request;
use DB;

class AdviceController extends Controller {

 public function getAdvicesAll() {
  $advices = Advice::getAdvicesAll();
  return \Response::json($advices);
 }

 public function getSubAdvices($adviceId) {
  $advices = Advice::getSubAdvices($adviceId);
  return \Response::json($advices);
 }

 public function getAdvices($appName) {
  $advices = Advice::getAdvices($appName);
  return \Response::json($advices);
 }

 public function getAdvicesMine() {
  $advices = Advice::getAdvicesMine();
  return \Response::json($advices);
 }

 public function getAdvice($id) {
  $advice = Advice::getAdvice($id);
  return \Response::json($advice);
 }

 public function createAdvice() {
  $advice = Advice::createAdvice();
  return \Response::json($advice);
 }

 public function editAdvice() {
  $advice = Advice::editAdvice();
  return \Response::json($advice);
 }

 public function getAdviceTimelines($adviceId) {
  $adviceTimelines = AdviceTimeline::getAdviceTimelines($adviceId);
  return \Response::json($adviceTimelines);
 }

 public function getAdviceTimeline($adviceId, $timelineId) {
  $adviceTimeline = AdviceTimeline::getAdviceTimeline($adviceId, $timelineId);
  return \Response::json($adviceTimeline);
 }

 public function createAdviceTimeline() {
  $adviceTimeline = AdviceTimeline::createAdviceTimeline();
  return \Response::json($adviceTimeline);
 }

 public function editAdviceTimeline() {
  $adviceTimeline = AdviceTimeline::editAdviceTimeline();
  return \Response::json($adviceTimeline);
 }

 /* TODOS */

 public function getAdviceTodos($adviceId) {
  $adviceTodos = AdviceTodo::getAdviceTodos($adviceId);
  return \Response::json($adviceTodos);
 }

 public function getAdviceTodo($adviceId, $todoId) {
  $adviceTodo = AdviceTodo::getAdviceTodo($adviceId, $todoId);
  return \Response::json($adviceTodo);
 }

 public function createAdviceTodo() {
  $adviceTodo = AdviceTodo::createAdviceTodo();
  return \Response::json($adviceTodo);
 }

 public function editAdviceTodo() {
  $adviceTodo = AdviceTodo::editAdviceTodo();
  return \Response::json($adviceTodo);
 }

 public function getAdviceTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createAdviceTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editAdviceTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getAdviceNotes($adviceId) {
  $adviceNotes = AdviceNote::getAdviceNotes($adviceId);
  return \Response::json($adviceNotes);
 }

 public function getAdviceNote($adviceId, $noteId) {
  $adviceNote = AdviceNote::getAdviceNote($adviceId, $noteId);
  return \Response::json($adviceNote);
 }

 public function createAdviceNote() {
  $adviceNote = AdviceNote::createAdviceNote();
  return \Response::json($adviceNote);
 }

 public function editAdviceNote() {
  $adviceNote = AdviceNote::editAdviceNote();
  return \Response::json($adviceNote);
 }

 public function getAdviceComments($adviceId) {
  $adviceComments = AdviceComment::getAdviceComments($adviceId);
  return \Response::json($adviceComments);
 }

 public function getAdviceComment($adviceId, $commentId) {
  $adviceComment = AdviceComment::getAdviceComment($adviceId, $commentId);
  return \Response::json($adviceComment);
 }

 public function createAdviceComment() {
  $adviceComment = AdviceComment::createAdviceComment();
  return \Response::json($adviceComment);
 }

 public function editAdviceComment() {
  $adviceComment = AdviceComment::editAdviceComment();
  return \Response::json($adviceComment);
 }

 public function getAdviceWeblinks($adviceId) {
  $adviceWeblinks = AdviceWeblink::getAdviceWeblinks($adviceId);
  return \Response::json($adviceWeblinks);
 }

 public function getAdviceWeblink($adviceId, $weblinkId) {
  $adviceWeblink = AdviceWeblink::getAdviceWeblink($adviceId, $weblinkId);
  return \Response::json($adviceWeblink);
 }

 public function createAdviceWeblink() {
  $adviceWeblink = AdviceWeblink::createAdviceWeblink();
  return \Response::json($adviceWeblink);
 }

 public function editAdviceWeblink() {
  $adviceWeblink = AdviceWeblink::editAdviceWeblink();
  return \Response::json($adviceWeblink);
 }

 //SWIPE
 public function getAdviceSwipes() {
  $adviceSwipes = AdviceSwipe::getAdviceSwipes();
  return \Response::json($adviceSwipes);
 }

 public function getAdviceSwipe() {
  $adviceSwipe = AdviceSwipe::getAdviceSwipe();
  return \Response::json($adviceSwipe);
 }

 public function createAdviceSwipe() {
  $adviceSwipe = AdviceSwipe::createAdviceSwipe();
  return \Response::json($adviceSwipe);
 }

}
