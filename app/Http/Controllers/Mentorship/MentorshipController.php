<?php

namespace App\Http\Controllers\Mentorship;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Mentorship\Mentorship;
use App\Models\Mentorship\MentorshipTimeline;
use App\Models\Mentorship\MentorshipComment;
use App\Models\Mentorship\MentorshipNote;
use App\Models\Mentorship\MentorshipTodo;
use App\Models\Mentorship\MentorshipWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use Request;
use DB;

class MentorshipController extends Controller {

 public function getMentorships() {
  $mentorships = Mentorship::getMentorships();
  return \Response::json($mentorships);
 }

 public function getMentorship($id) {
  $mentorship = Mentorship::getMentorship($id);
  return \Response::json($mentorship);
 }

 public function createMentorship() {
  $mentorship = Mentorship::createMentorship();
  return \Response::json($mentorship);
 }

 public function editMentorship() {
  $mentorship = Mentorship::editMentorship();
  return \Response::json($mentorship);
 }

 public function getMentorshipTimelines($mentorshipId) {
  $mentorshipTimelines = MentorshipTimeline::getMentorshipTimelines($mentorshipId);
  return \Response::json($mentorshipTimelines);
 }

 public function getMentorshipTimeline($mentorshipId, $timelineId) {
  $mentorshipTimeline = MentorshipTimeline::getMentorshipTimeline($mentorshipId, $timelineId);
  return \Response::json($mentorshipTimeline);
 }

 public function createMentorshipTimeline() {
  $mentorshipTimeline = MentorshipTimeline::createMentorshipTimeline();
  return \Response::json($mentorshipTimeline);
 }

 public function editMentorshipTimeline() {
  $mentorshipTimeline = MentorshipTimeline::editMentorshipTimeline();
  return \Response::json($mentorshipTimeline);
 }

 /* TODOS */

 public function getMentorshipTodos($mentorshipId) {
  $mentorshipTodos = MentorshipTodo::getMentorshipTodos($mentorshipId);
  return \Response::json($mentorshipTodos);
 }

 public function getMentorshipTodo($mentorshipId, $todoId) {
  $mentorshipTodo = MentorshipTodo::getMentorshipTodo($mentorshipId, $todoId);
  return \Response::json($mentorshipTodo);
 }

 public function createMentorshipTodo() {
  $mentorshipTodo = MentorshipTodo::createMentorshipTodo();
  return \Response::json($mentorshipTodo);
 }

 public function editMentorshipTodo() {
  $mentorshipTodo = MentorshipTodo::editMentorshipTodo();
  return \Response::json($mentorshipTodo);
 }

 public function getMentorshipTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createMentorshipTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editMentorshipTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getMentorshipNotes($mentorshipId) {
  $mentorshipNotes = MentorshipNote::getMentorshipNotes($mentorshipId);
  return \Response::json($mentorshipNotes);
 }

 public function getMentorshipNote($mentorshipId, $noteId) {
  $mentorshipNote = MentorshipNote::getMentorshipNote($mentorshipId, $noteId);
  return \Response::json($mentorshipNote);
 }

 public function createMentorshipNote() {
  $mentorshipNote = MentorshipNote::createMentorshipNote();
  return \Response::json($mentorshipNote);
 }

 public function editMentorshipNote() {
  $mentorshipNote = MentorshipNote::editMentorshipNote();
  return \Response::json($mentorshipNote);
 }

 public function getMentorshipComments($mentorshipId) {
  $mentorshipComments = MentorshipComment::getMentorshipComments($mentorshipId);
  return \Response::json($mentorshipComments);
 }

 public function getMentorshipComment($mentorshipId, $commentId) {
  $mentorshipComment = MentorshipComment::getMentorshipComment($mentorshipId, $commentId);
  return \Response::json($mentorshipComment);
 }

 public function createMentorshipComment() {
  $mentorshipComment = MentorshipComment::createMentorshipComment();
  return \Response::json($mentorshipComment);
 }

 public function editMentorshipComment() {
  $mentorshipComment = MentorshipComment::editMentorshipComment();
  return \Response::json($mentorshipComment);
 }

 public function getMentorshipWeblinks($mentorshipId) {
  $mentorshipWeblinks = MentorshipWeblink::getMentorshipWeblinks($mentorshipId);
  return \Response::json($mentorshipWeblinks);
 }

 public function getMentorshipWeblink($mentorshipId, $weblinkId) {
  $mentorshipWeblink = MentorshipWeblink::getMentorshipWeblink($mentorshipId, $weblinkId);
  return \Response::json($mentorshipWeblink);
 }

 public function createMentorshipWeblink() {
  $mentorshipWeblink = MentorshipWeblink::createMentorshipWeblink();
  return \Response::json($mentorshipWeblink);
 }

 public function editMentorshipWeblink() {
  $mentorshipWeblink = MentorshipWeblink::editMentorshipWeblink();
  return \Response::json($mentorshipWeblink);
 }

}
