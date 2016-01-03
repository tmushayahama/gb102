<?php

namespace App\Http\Controllers\Group;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Group\Group;
use App\Models\Group\GroupTimeline;
use App\Models\Group\GroupComment;
use App\Models\Group\GroupNote;
use App\Models\Group\GroupTodo;
use App\Models\Group\GroupWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Group\GroupSwipe;
use Request;
use DB;

class GroupController extends Controller {

 public function getGroupsAll() {
  $groups = Group::getGroupsAll();
  return \Response::json($groups);
 }

 public function getGroupsMine() {
  $groups = Group::getGroupsMine();
  return \Response::json($groups);
 }

 public function getGroup($id) {
  $group = Group::getGroup($id);
  return \Response::json($group);
 }

 public function createGroup() {
  $group = Group::createGroup();
  return \Response::json($group);
 }

 public function editGroup() {
  $group = Group::editGroup();
  return \Response::json($group);
 }

 public function getGroupTimelines($groupId) {
  $groupTimelines = GroupTimeline::getGroupTimelines($groupId);
  return \Response::json($groupTimelines);
 }

 public function getGroupTimeline($groupId, $timelineId) {
  $groupTimeline = GroupTimeline::getGroupTimeline($groupId, $timelineId);
  return \Response::json($groupTimeline);
 }

 public function createGroupTimeline() {
  $groupTimeline = GroupTimeline::createGroupTimeline();
  return \Response::json($groupTimeline);
 }

 public function editGroupTimeline() {
  $groupTimeline = GroupTimeline::editGroupTimeline();
  return \Response::json($groupTimeline);
 }

 /* TODOS */

 public function getGroupTodos($groupId) {
  $groupTodos = GroupTodo::getGroupTodos($groupId);
  return \Response::json($groupTodos);
 }

 public function getGroupTodo($groupId, $todoId) {
  $groupTodo = GroupTodo::getGroupTodo($groupId, $todoId);
  return \Response::json($groupTodo);
 }

 public function createGroupTodo() {
  $groupTodo = GroupTodo::createGroupTodo();
  return \Response::json($groupTodo);
 }

 public function editGroupTodo() {
  $groupTodo = GroupTodo::editGroupTodo();
  return \Response::json($groupTodo);
 }

 public function getGroupTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createGroupTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editGroupTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getGroupNotes($groupId) {
  $groupNotes = GroupNote::getGroupNotes($groupId);
  return \Response::json($groupNotes);
 }

 public function getGroupNote($groupId, $noteId) {
  $groupNote = GroupNote::getGroupNote($groupId, $noteId);
  return \Response::json($groupNote);
 }

 public function createGroupNote() {
  $groupNote = GroupNote::createGroupNote();
  return \Response::json($groupNote);
 }

 public function editGroupNote() {
  $groupNote = GroupNote::editGroupNote();
  return \Response::json($groupNote);
 }

 public function getGroupComments($groupId) {
  $groupComments = GroupComment::getGroupComments($groupId);
  return \Response::json($groupComments);
 }

 public function getGroupComment($groupId, $commentId) {
  $groupComment = GroupComment::getGroupComment($groupId, $commentId);
  return \Response::json($groupComment);
 }

 public function createGroupComment() {
  $groupComment = GroupComment::createGroupComment();
  return \Response::json($groupComment);
 }

 public function editGroupComment() {
  $groupComment = GroupComment::editGroupComment();
  return \Response::json($groupComment);
 }

 public function getGroupWeblinks($groupId) {
  $groupWeblinks = GroupWeblink::getGroupWeblinks($groupId);
  return \Response::json($groupWeblinks);
 }

 public function getGroupWeblink($groupId, $weblinkId) {
  $groupWeblink = GroupWeblink::getGroupWeblink($groupId, $weblinkId);
  return \Response::json($groupWeblink);
 }

 public function createGroupWeblink() {
  $groupWeblink = GroupWeblink::createGroupWeblink();
  return \Response::json($groupWeblink);
 }

 public function editGroupWeblink() {
  $groupWeblink = GroupWeblink::editGroupWeblink();
  return \Response::json($groupWeblink);
 }

 //SWIPE
 public function getGroupSwipes() {
  $groupSwipes = GroupSwipe::getGroupSwipes();
  return \Response::json($groupSwipes);
 }

 public function getGroupSwipe() {
  $groupSwipe = GroupSwipe::getGroupSwipe();
  return \Response::json($groupSwipe);
 }

 public function createGroupSwipe() {
  $groupSwipe = GroupSwipe::createGroupSwipe();
  return \Response::json($groupSwipe);
 }

}
