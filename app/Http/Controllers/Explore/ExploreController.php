<?php

namespace App\Http\Controllers\Explore;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Explore\Explore;
use App\Models\Explore\ExploreComment;
use App\Models\Explore\ExploreContributor;
use App\Models\Explore\ExploreNote;
use App\Models\Explore\ExploreRequestOption;
use App\Models\Explore\ExploreTodo;
use App\Models\Explore\ExploreWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Comment\Comment;
use App\Models\Contributor\Contributor;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Explore\ExploreSwipe;
use Request;
use DB;

class ExploreController extends Controller {

 public function getExploresAll() {
  $explores = Explore::getExploresAll();
  return \Response::json($explores);
 }

 public function getExplores($appName) {
  $explores = Explore::getExplores($appName);
  return \Response::json($explores);
 }

 public function getExploresMine() {
  $explores = Explore::getExploresMine();
  return \Response::json($explores);
 }

 public function getExplore($id) {
  $explore = Explore::getExplore($id);
  return \Response::json($explore);
 }

 public function createExplore() {
  $explore = Explore::createExplore();
  return \Response::json($explore);
 }

 public function editExplore() {
  $explore = Explore::editExplore();
  return \Response::json($explore);
 }

 public function getExploreRequestOptions($exploreId) {
  $exploreRequestOptions = ExploreRequestOption::getExploreRequestOptions($exploreId);
  return \Response::json($exploreRequestOptions);
 }

 /* TODOS */

 public function getExploreTodos($exploreId) {
  $exploreTodos = ExploreTodo::getExploreTodos($exploreId);
  return \Response::json($exploreTodos);
 }

 public function getExploreTodo($exploreId, $todoId) {
  $exploreTodo = ExploreTodo::getExploreTodo($exploreId, $todoId);
  return \Response::json($exploreTodo);
 }

 public function createExploreTodo() {
  $exploreTodo = ExploreTodo::createExploreTodo();
  return \Response::json($exploreTodo);
 }

 public function editExploreTodo() {
  $exploreTodo = ExploreTodo::editExploreTodo();
  return \Response::json($exploreTodo);
 }

 public function getExploreTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createExploreTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editExploreTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getExploreNotes($exploreId) {
  $exploreNotes = ExploreNote::getExploreNotes($exploreId);
  return \Response::json($exploreNotes);
 }

 public function getExploreNote($exploreId, $noteId) {
  $exploreNote = ExploreNote::getExploreNote($exploreId, $noteId);
  return \Response::json($exploreNote);
 }

 public function createExploreNote() {
  $exploreNote = ExploreNote::createExploreNote();
  return \Response::json($exploreNote);
 }

 public function editExploreNote() {
  $exploreNote = ExploreNote::editExploreNote();
  return \Response::json($exploreNote);
 }

 public function getExploreComments($exploreId) {
  $exploreComments = ExploreComment::getExploreComments($exploreId);
  return \Response::json($exploreComments);
 }

 public function getExploreComment($exploreId, $commentId) {
  $exploreComment = ExploreComment::getExploreComment($exploreId, $commentId);
  return \Response::json($exploreComment);
 }

 public function createExploreComment() {
  $exploreComment = ExploreComment::createExploreComment();
  return \Response::json($exploreComment);
 }

 public function editExploreComment() {
  $exploreComment = ExploreComment::editExploreComment();
  return \Response::json($exploreComment);
 }

 public function getExploreContributors($exploreId) {
  $exploreContributors = ExploreContributor::getExploreContributors($exploreId);
  return \Response::json($exploreContributors);
 }

 public function getExploreContributor($exploreId, $contributorId) {
  $exploreContributor = ExploreContributor::getExploreContributor($exploreId, $contributorId);
  return \Response::json($exploreContributor);
 }

 public function createExploreContributor() {
  $exploreContributor = ExploreContributor::createExploreContributor();
  return \Response::json($exploreContributor);
 }

 public function editExploreContributor() {
  $exploreContributor = ExploreContributor::editExploreContributor();
  return \Response::json($exploreContributor);
 }

 public function getExploreWeblinks($exploreId) {
  $exploreWeblinks = ExploreWeblink::getExploreWeblinks($exploreId);
  return \Response::json($exploreWeblinks);
 }

 public function getExploreWeblink($exploreId, $weblinkId) {
  $exploreWeblink = ExploreWeblink::getExploreWeblink($exploreId, $weblinkId);
  return \Response::json($exploreWeblink);
 }

 public function createExploreWeblink() {
  $exploreWeblink = ExploreWeblink::createExploreWeblink();
  return \Response::json($exploreWeblink);
 }

 public function editExploreWeblink() {
  $exploreWeblink = ExploreWeblink::editExploreWeblink();
  return \Response::json($exploreWeblink);
 }

 //SWIPE
 public function getExploreSwipes() {
  $exploreSwipes = ExploreSwipe::getExploreSwipes();
  return \Response::json($exploreSwipes);
 }

 public function getExploreSwipe() {
  $exploreSwipe = ExploreSwipe::getExploreSwipe();
  return \Response::json($exploreSwipe);
 }

 public function createExploreSwipe() {
  $exploreSwipe = ExploreSwipe::createExploreSwipe();
  return \Response::json($exploreSwipe);
 }

}
