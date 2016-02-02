<?php

namespace App\Http\Controllers\Collaboration;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Collaboration\Collaboration;
use App\Models\Collaboration\CollaborationTimeline;
use App\Models\Collaboration\CollaborationComment;
use App\Models\Collaboration\CollaborationNote;
use App\Models\Collaboration\CollaborationTodo;
use App\Models\Collaboration\CollaborationWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Collaboration\CollaborationSwipe;
use Request;
use DB;

class CollaborationController extends Controller {

 public function getCollaborationsAll() {
  $collaborations = Collaboration::getCollaborationsAll();
  return \Response::json($collaborations);
 }

 public function getSubCollaborations($collaborationId) {
  $collaborations = Collaboration::getSubCollaborations($collaborationId);
  return \Response::json($collaborations);
 }

 public function getCollaborations($appName) {
  $collaborations = Collaboration::getCollaborations($appName);
  return \Response::json($collaborations);
 }

 public function getCollaborationsMine() {
  $collaborations = Collaboration::getCollaborationsMine();
  return \Response::json($collaborations);
 }

 public function getCollaboration($id) {
  $collaboration = Collaboration::getCollaboration($id);
  return \Response::json($collaboration);
 }

 public function createCollaboration() {
  $collaboration = Collaboration::createCollaboration();
  return \Response::json($collaboration);
 }

 public function editCollaboration() {
  $collaboration = Collaboration::editCollaboration();
  return \Response::json($collaboration);
 }

 public function getCollaborationTimelines($collaborationId) {
  $collaborationTimelines = CollaborationTimeline::getCollaborationTimelines($collaborationId);
  return \Response::json($collaborationTimelines);
 }

 public function getCollaborationTimeline($collaborationId, $timelineId) {
  $collaborationTimeline = CollaborationTimeline::getCollaborationTimeline($collaborationId, $timelineId);
  return \Response::json($collaborationTimeline);
 }

 public function createCollaborationTimeline() {
  $collaborationTimeline = CollaborationTimeline::createCollaborationTimeline();
  return \Response::json($collaborationTimeline);
 }

 public function editCollaborationTimeline() {
  $collaborationTimeline = CollaborationTimeline::editCollaborationTimeline();
  return \Response::json($collaborationTimeline);
 }

 /* TODOS */

 public function getCollaborationTodos($collaborationId) {
  $collaborationTodos = CollaborationTodo::getCollaborationTodos($collaborationId);
  return \Response::json($collaborationTodos);
 }

 public function getCollaborationTodo($collaborationId, $todoId) {
  $collaborationTodo = CollaborationTodo::getCollaborationTodo($collaborationId, $todoId);
  return \Response::json($collaborationTodo);
 }

 public function createCollaborationTodo() {
  $collaborationTodo = CollaborationTodo::createCollaborationTodo();
  return \Response::json($collaborationTodo);
 }

 public function editCollaborationTodo() {
  $collaborationTodo = CollaborationTodo::editCollaborationTodo();
  return \Response::json($collaborationTodo);
 }

 public function getCollaborationTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createCollaborationTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editCollaborationTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getCollaborationNotes($collaborationId) {
  $collaborationNotes = CollaborationNote::getCollaborationNotes($collaborationId);
  return \Response::json($collaborationNotes);
 }

 public function getCollaborationNote($collaborationId, $noteId) {
  $collaborationNote = CollaborationNote::getCollaborationNote($collaborationId, $noteId);
  return \Response::json($collaborationNote);
 }

 public function createCollaborationNote() {
  $collaborationNote = CollaborationNote::createCollaborationNote();
  return \Response::json($collaborationNote);
 }

 public function editCollaborationNote() {
  $collaborationNote = CollaborationNote::editCollaborationNote();
  return \Response::json($collaborationNote);
 }

 public function getCollaborationComments($collaborationId) {
  $collaborationComments = CollaborationComment::getCollaborationComments($collaborationId);
  return \Response::json($collaborationComments);
 }

 public function getCollaborationComment($collaborationId, $commentId) {
  $collaborationComment = CollaborationComment::getCollaborationComment($collaborationId, $commentId);
  return \Response::json($collaborationComment);
 }

 public function createCollaborationComment() {
  $collaborationComment = CollaborationComment::createCollaborationComment();
  return \Response::json($collaborationComment);
 }

 public function editCollaborationComment() {
  $collaborationComment = CollaborationComment::editCollaborationComment();
  return \Response::json($collaborationComment);
 }

 public function getCollaborationWeblinks($collaborationId) {
  $collaborationWeblinks = CollaborationWeblink::getCollaborationWeblinks($collaborationId);
  return \Response::json($collaborationWeblinks);
 }

 public function getCollaborationWeblink($collaborationId, $weblinkId) {
  $collaborationWeblink = CollaborationWeblink::getCollaborationWeblink($collaborationId, $weblinkId);
  return \Response::json($collaborationWeblink);
 }

 public function createCollaborationWeblink() {
  $collaborationWeblink = CollaborationWeblink::createCollaborationWeblink();
  return \Response::json($collaborationWeblink);
 }

 public function editCollaborationWeblink() {
  $collaborationWeblink = CollaborationWeblink::editCollaborationWeblink();
  return \Response::json($collaborationWeblink);
 }

 //SWIPE
 public function getCollaborationSwipes() {
  $collaborationSwipes = CollaborationSwipe::getCollaborationSwipes();
  return \Response::json($collaborationSwipes);
 }

 public function getCollaborationSwipe() {
  $collaborationSwipe = CollaborationSwipe::getCollaborationSwipe();
  return \Response::json($collaborationSwipe);
 }

 public function createCollaborationSwipe() {
  $collaborationSwipe = CollaborationSwipe::createCollaborationSwipe();
  return \Response::json($collaborationSwipe);
 }

}
