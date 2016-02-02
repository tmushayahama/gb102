<?php

namespace App\Http\Controllers\Journal;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Journal\Journal;
use App\Models\Journal\JournalTimeline;
use App\Models\Journal\JournalComment;
use App\Models\Journal\JournalNote;
use App\Models\Journal\JournalTodo;
use App\Models\Journal\JournalWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Journal\JournalSwipe;
use Request;
use DB;

class JournalController extends Controller {

 public function getJournalsAll() {
  $journals = Journal::getJournalsAll();
  return \Response::json($journals);
 }

 public function getSubJournals($journalId) {
  $journals = Journal::getSubJournals($journalId);
  return \Response::json($journals);
 }

 public function getJournals($appName) {
  $journals = Journal::getJournals($appName);
  return \Response::json($journals);
 }

 public function getJournalsMine() {
  $journals = Journal::getJournalsMine();
  return \Response::json($journals);
 }

 public function getJournal($id) {
  $journal = Journal::getJournal($id);
  return \Response::json($journal);
 }

 public function createJournal() {
  $journal = Journal::createJournal();
  return \Response::json($journal);
 }

 public function editJournal() {
  $journal = Journal::editJournal();
  return \Response::json($journal);
 }

 public function getJournalTimelines($journalId) {
  $journalTimelines = JournalTimeline::getJournalTimelines($journalId);
  return \Response::json($journalTimelines);
 }

 public function getJournalTimeline($journalId, $timelineId) {
  $journalTimeline = JournalTimeline::getJournalTimeline($journalId, $timelineId);
  return \Response::json($journalTimeline);
 }

 public function createJournalTimeline() {
  $journalTimeline = JournalTimeline::createJournalTimeline();
  return \Response::json($journalTimeline);
 }

 public function editJournalTimeline() {
  $journalTimeline = JournalTimeline::editJournalTimeline();
  return \Response::json($journalTimeline);
 }

 /* TODOS */

 public function getJournalTodos($journalId) {
  $journalTodos = JournalTodo::getJournalTodos($journalId);
  return \Response::json($journalTodos);
 }

 public function getJournalTodo($journalId, $todoId) {
  $journalTodo = JournalTodo::getJournalTodo($journalId, $todoId);
  return \Response::json($journalTodo);
 }

 public function createJournalTodo() {
  $journalTodo = JournalTodo::createJournalTodo();
  return \Response::json($journalTodo);
 }

 public function editJournalTodo() {
  $journalTodo = JournalTodo::editJournalTodo();
  return \Response::json($journalTodo);
 }

 public function getJournalTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createJournalTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editJournalTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getJournalNotes($journalId) {
  $journalNotes = JournalNote::getJournalNotes($journalId);
  return \Response::json($journalNotes);
 }

 public function getJournalNote($journalId, $noteId) {
  $journalNote = JournalNote::getJournalNote($journalId, $noteId);
  return \Response::json($journalNote);
 }

 public function createJournalNote() {
  $journalNote = JournalNote::createJournalNote();
  return \Response::json($journalNote);
 }

 public function editJournalNote() {
  $journalNote = JournalNote::editJournalNote();
  return \Response::json($journalNote);
 }

 public function getJournalComments($journalId) {
  $journalComments = JournalComment::getJournalComments($journalId);
  return \Response::json($journalComments);
 }

 public function getJournalComment($journalId, $commentId) {
  $journalComment = JournalComment::getJournalComment($journalId, $commentId);
  return \Response::json($journalComment);
 }

 public function createJournalComment() {
  $journalComment = JournalComment::createJournalComment();
  return \Response::json($journalComment);
 }

 public function editJournalComment() {
  $journalComment = JournalComment::editJournalComment();
  return \Response::json($journalComment);
 }

 public function getJournalWeblinks($journalId) {
  $journalWeblinks = JournalWeblink::getJournalWeblinks($journalId);
  return \Response::json($journalWeblinks);
 }

 public function getJournalWeblink($journalId, $weblinkId) {
  $journalWeblink = JournalWeblink::getJournalWeblink($journalId, $weblinkId);
  return \Response::json($journalWeblink);
 }

 public function createJournalWeblink() {
  $journalWeblink = JournalWeblink::createJournalWeblink();
  return \Response::json($journalWeblink);
 }

 public function editJournalWeblink() {
  $journalWeblink = JournalWeblink::editJournalWeblink();
  return \Response::json($journalWeblink);
 }

 //SWIPE
 public function getJournalSwipes() {
  $journalSwipes = JournalSwipe::getJournalSwipes();
  return \Response::json($journalSwipes);
 }

 public function getJournalSwipe() {
  $journalSwipe = JournalSwipe::getJournalSwipe();
  return \Response::json($journalSwipe);
 }

 public function createJournalSwipe() {
  $journalSwipe = JournalSwipe::createJournalSwipe();
  return \Response::json($journalSwipe);
 }

}
