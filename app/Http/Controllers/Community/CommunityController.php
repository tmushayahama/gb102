<?php

namespace App\Http\Controllers\Community;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Community\Community;
use App\Models\Community\CommunityTimeline;
use App\Models\Community\CommunityComment;
use App\Models\Community\CommunityNote;
use App\Models\Community\CommunityTodo;
use App\Models\Community\CommunityWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Timeline\Timeline;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Community\CommunitySwipe;
use Request;
use DB;

class CommunityController extends Controller {

 public function getUsers() {
  $users = Community::getUsers();
  return \Response::json($users);
 }

 public function getCommunitysMine() {
  $communitys = Community::getCommunitysMine();
  return \Response::json($communitys);
 }

 public function getCommunity($id) {
  $community = Community::getCommunity($id);
  return \Response::json($community);
 }

 public function createCommunity() {
  $community = Community::createCommunity();
  return \Response::json($community);
 }

 public function editCommunity() {
  $community = Community::editCommunity();
  return \Response::json($community);
 }

 public function getCommunityTimelines($communityId) {
  $communityTimelines = CommunityTimeline::getCommunityTimelines($communityId);
  return \Response::json($communityTimelines);
 }

 public function getCommunityTimeline($communityId, $timelineId) {
  $communityTimeline = CommunityTimeline::getCommunityTimeline($communityId, $timelineId);
  return \Response::json($communityTimeline);
 }

 public function createCommunityTimeline() {
  $communityTimeline = CommunityTimeline::createCommunityTimeline();
  return \Response::json($communityTimeline);
 }

 public function editCommunityTimeline() {
  $communityTimeline = CommunityTimeline::editCommunityTimeline();
  return \Response::json($communityTimeline);
 }

 /* TODOS */

 public function getCommunityTodos($communityId) {
  $communityTodos = CommunityTodo::getCommunityTodos($communityId);
  return \Response::json($communityTodos);
 }

 public function getCommunityTodo($communityId, $todoId) {
  $communityTodo = CommunityTodo::getCommunityTodo($communityId, $todoId);
  return \Response::json($communityTodo);
 }

 public function createCommunityTodo() {
  $communityTodo = CommunityTodo::createCommunityTodo();
  return \Response::json($communityTodo);
 }

 public function editCommunityTodo() {
  $communityTodo = CommunityTodo::editCommunityTodo();
  return \Response::json($communityTodo);
 }

 public function getCommunityTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createCommunityTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editCommunityTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getCommunityNotes($communityId) {
  $communityNotes = CommunityNote::getCommunityNotes($communityId);
  return \Response::json($communityNotes);
 }

 public function getCommunityNote($communityId, $noteId) {
  $communityNote = CommunityNote::getCommunityNote($communityId, $noteId);
  return \Response::json($communityNote);
 }

 public function createCommunityNote() {
  $communityNote = CommunityNote::createCommunityNote();
  return \Response::json($communityNote);
 }

 public function editCommunityNote() {
  $communityNote = CommunityNote::editCommunityNote();
  return \Response::json($communityNote);
 }

 public function getCommunityComments($communityId) {
  $communityComments = CommunityComment::getCommunityComments($communityId);
  return \Response::json($communityComments);
 }

 public function getCommunityComment($communityId, $commentId) {
  $communityComment = CommunityComment::getCommunityComment($communityId, $commentId);
  return \Response::json($communityComment);
 }

 public function createCommunityComment() {
  $communityComment = CommunityComment::createCommunityComment();
  return \Response::json($communityComment);
 }

 public function editCommunityComment() {
  $communityComment = CommunityComment::editCommunityComment();
  return \Response::json($communityComment);
 }

 public function getCommunityWeblinks($communityId) {
  $communityWeblinks = CommunityWeblink::getCommunityWeblinks($communityId);
  return \Response::json($communityWeblinks);
 }

 public function getCommunityWeblink($communityId, $weblinkId) {
  $communityWeblink = CommunityWeblink::getCommunityWeblink($communityId, $weblinkId);
  return \Response::json($communityWeblink);
 }

 public function createCommunityWeblink() {
  $communityWeblink = CommunityWeblink::createCommunityWeblink();
  return \Response::json($communityWeblink);
 }

 public function editCommunityWeblink() {
  $communityWeblink = CommunityWeblink::editCommunityWeblink();
  return \Response::json($communityWeblink);
 }

 //SWIPE
 public function getCommunitySwipes() {
  $communitySwipes = CommunitySwipe::getCommunitySwipes();
  return \Response::json($communitySwipes);
 }

 public function getCommunitySwipe() {
  $communitySwipe = CommunitySwipe::getCommunitySwipe();
  return \Response::json($communitySwipe);
 }

 public function createCommunitySwipe() {
  $communitySwipe = CommunitySwipe::createCommunitySwipe();
  return \Response::json($communitySwipe);
 }

}
