<?php

namespace App\Http\Controllers\Swipe;

//use Illuminate\Contracts\Auth;
//use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Swipe\Swipe;
use App\Models\Swipe\SwipeProgress;
use App\Models\Swipe\SwipeComment;
use App\Models\Swipe\SwipeNote;
use App\Models\Swipe\SwipeTodo;
use App\Models\Swipe\SwipeWeblink;
use App\Models\Todo\TodoChecklist;

class SwipeController extends Controller {

 public function getAllSwipeAnswers() {
  $swipes = Swipe::getAllSwipeAnswers();
  return \Response::json($swipes);
 }

 public function getSwipeAnswers($userId) {
  $swipes = Swipe::getSwipeAnswers($userId);
  return \Response::json($swipes);
 }

 public function getSwipesMine() {
  $swipes = Swipe::getSwipesMine();
  return \Response::json($swipes);
 }

 public function getSwipe() {
  $swipe = Swipe::getSwipe();
  return \Response::json($swipe);
 }

 public function createSwipe() {
  $swipe = Swipe::createSwipe();
  return \Response::json($swipe);
 }

 public function editSwipe() {
  $swipe = Swipe::editSwipe();
  return \Response::json($swipe);
 }

 public function getSwipeProgress($swipeId) {
  $swipeProgress = SwipeProgress::getSwipeProgress($swipeId);
  return \Response::json($swipeProgress);
 }

 public function getSwipeProgressItem($swipeId, $progressId) {
  $swipeProgress = SwipeProgress::getSwipeProgress($swipeId, $progressId);
  return \Response::json($swipeProgress);
 }

 public function createSwipeProgress() {
  $swipeProgress = SwipeProgress::createSwipeProgress();
  return \Response::json($swipeProgress);
 }

 public function editSwipeProgress() {
  $swipeProgress = SwipeProgress::editSwipeProgress();
  return \Response::json($swipeProgress);
 }

 /* TODOS */

 public function getSwipeTodos($swipeId) {
  $swipeTodos = SwipeTodo::getSwipeTodos($swipeId);
  return \Response::json($swipeTodos);
 }

 public function getSwipeTodo($swipeId, $todoId) {
  $swipeTodo = SwipeTodo::getSwipeTodo($swipeId, $todoId);
  return \Response::json($swipeTodo);
 }

 public function createSwipeTodo() {
  $swipeTodo = SwipeTodo::createSwipeTodo();
  return \Response::json($swipeTodo);
 }

 public function editSwipeTodo() {
  $swipeTodo = SwipeTodo::editSwipeTodo();
  return \Response::json($swipeTodo);
 }

 public function getSwipeTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createSwipeTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editSwipeTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getSwipeNotes($swipeId) {
  $swipeNotes = SwipeNote::getSwipeNotes($swipeId);
  return \Response::json($swipeNotes);
 }

 public function getSwipeNote($swipeId, $noteId) {
  $swipeNote = SwipeNote::getSwipeNote($swipeId, $noteId);
  return \Response::json($swipeNote);
 }

 public function createSwipeNote() {
  $swipeNote = SwipeNote::createSwipeNote();
  return \Response::json($swipeNote);
 }

 public function editSwipeNote() {
  $swipeNote = SwipeNote::editSwipeNote();
  return \Response::json($swipeNote);
 }

 public function getSwipeComments($swipeId) {
  $swipeComments = SwipeComment::getSwipeComments($swipeId);
  return \Response::json($swipeComments);
 }

 public function getSwipeComment($swipeId, $commentId) {
  $swipeComment = SwipeComment::getSwipeComment($swipeId, $commentId);
  return \Response::json($swipeComment);
 }

 public function createSwipeComment() {
  $swipeComment = SwipeComment::createSwipeComment();
  return \Response::json($swipeComment);
 }

 public function editSwipeComment() {
  $swipeComment = SwipeComment::editSwipeComment();
  return \Response::json($swipeComment);
 }

 public function getSwipeWeblinks($swipeId) {
  $swipeWeblinks = SwipeWeblink::getSwipeWeblinks($swipeId);
  return \Response::json($swipeWeblinks);
 }

 public function getSwipeWeblink($swipeId, $weblinkId) {
  $swipeWeblink = SwipeWeblink::getSwipeWeblink($swipeId, $weblinkId);
  return \Response::json($swipeWeblink);
 }

 public function createSwipeWeblink() {
  $swipeWeblink = SwipeWeblink::createSwipeWeblink();
  return \Response::json($swipeWeblink);
 }

 public function editSwipeWeblink() {
  $swipeWeblink = SwipeWeblink::editSwipeWeblink();
  return \Response::json($swipeWeblink);
 }

 //SWIPE
 public function getSwipeSwipes() {
  $swipeSwipes = SwipeSwipe::getSwipeSwipes();
  return \Response::json($swipeSwipes);
 }

 public function getSwipeSwipe() {
  $swipeSwipe = SwipeSwipe::getSwipeSwipe();
  return \Response::json($swipeSwipe);
 }

 public function createSwipeSwipe() {
  $swipeSwipe = SwipeSwipe::createSwipeSwipe();
  return \Response::json($swipeSwipe);
 }

}
