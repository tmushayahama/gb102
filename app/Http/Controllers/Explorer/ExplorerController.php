<?php

namespace App\Http\Controllers\Explorer;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\Explorer\Explorer;
use App\Models\Explorer\ExplorerComment;
use App\Models\Explorer\ExplorerContribution;
use App\Models\Explorer\ExplorerNote;
use App\Models\Explorer\ExplorerRequestOption;
use App\Models\Explorer\ExplorerTodo;
use App\Models\Explorer\ExplorerWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Comment\Comment;
use App\Models\Contribution\Contribution;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Explorer\ExplorerSwipe;
use Request;
use DB;

class ExplorerController extends Controller {

 public function getExplorersAll() {
  $explorers = Explorer::getExplorersAll();
  return \Response::json($explorers);
 }

 public function getExplorers($appName) {
  $explorers = Explorer::getExplorers($appName);
  return \Response::json($explorers);
 }

 public function getExplorersMine() {
  $explorers = Explorer::getExplorersMine();
  return \Response::json($explorers);
 }

 public function getExplorer($id) {
  $explorer = Explorer::getExplorer($id);
  return \Response::json($explorer);
 }

 public function createExplorer() {
  $explorer = Explorer::createExplorer();
  return \Response::json($explorer);
 }

 public function editExplorer() {
  $explorer = Explorer::editExplorer();
  return \Response::json($explorer);
 }

 public function getExplorerRequestOptions($explorerId) {
  $explorerRequestOptions = ExplorerRequestOption::getExplorerRequestOptions($explorerId);
  return \Response::json($explorerRequestOptions);
 }

 /* TODOS */

 public function getExplorerTodos($explorerId, $levelId) {
  $explorerTodos = ExplorerTodo::getExplorerTodos($explorerId, $levelId);
  return \Response::json($explorerTodos);
 }

 public function getExplorerTodo($explorerId, $todoId) {
  $explorerTodo = ExplorerTodo::getExplorerTodo($explorerId, $todoId);
  return \Response::json($explorerTodo);
 }

 public function createExplorerTodo() {
  $explorerTodo = ExplorerTodo::createExplorerTodo();
  return \Response::json($explorerTodo);
 }

 public function editExplorerTodo() {
  $explorerTodo = ExplorerTodo::editExplorerTodo();
  return \Response::json($explorerTodo);
 }

 public function getExplorerTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createExplorerTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editExplorerTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getExplorerNotes($explorerId) {
  $explorerNotes = ExplorerNote::getExplorerNotes($explorerId);
  return \Response::json($explorerNotes);
 }

 public function getExplorerNote($explorerId, $noteId) {
  $explorerNote = ExplorerNote::getExplorerNote($explorerId, $noteId);
  return \Response::json($explorerNote);
 }

 public function createExplorerNote() {
  $explorerNote = ExplorerNote::createExplorerNote();
  return \Response::json($explorerNote);
 }

 public function editExplorerNote() {
  $explorerNote = ExplorerNote::editExplorerNote();
  return \Response::json($explorerNote);
 }

 public function getExplorerComments($explorerId) {
  $explorerComments = ExplorerComment::getExplorerComments($explorerId);
  return \Response::json($explorerComments);
 }

 public function getExplorerComment($explorerId, $commentId) {
  $explorerComment = ExplorerComment::getExplorerComment($explorerId, $commentId);
  return \Response::json($explorerComment);
 }

 public function createExplorerComment() {
  $explorerComment = ExplorerComment::createExplorerComment();
  return \Response::json($explorerComment);
 }

 public function editExplorerComment() {
  $explorerComment = ExplorerComment::editExplorerComment();
  return \Response::json($explorerComment);
 }

 public function getExplorerContributions($explorerId) {
  $explorerContributions = ExplorerContribution::getExplorerContributions($explorerId);
  return \Response::json($explorerContributions);
 }

 public function getExplorerContribution($explorerId, $contributionId) {
  $explorerContribution = ExplorerContribution::getExplorerContribution($explorerId, $contributionId);
  return \Response::json($explorerContribution);
 }

 public function getExplorerContributionLevel($explorerId, $contributionId) {
  $level = ExplorerContribution::getExplorerContributionLevel($explorerId, $contributionId);
  return \Response::json($level);
 }

 public function createExplorerContribution() {
  $explorerContribution = ExplorerContribution::createExplorerContribution();
  return \Response::json($explorerContribution);
 }

 public function editExplorerContribution() {
  $explorerContribution = ExplorerContribution::editExplorerContribution();
  return \Response::json($explorerContribution);
 }

 public function getExplorerWeblinks($explorerId) {
  $explorerWeblinks = ExplorerWeblink::getExplorerWeblinks($explorerId);
  return \Response::json($explorerWeblinks);
 }

 public function getExplorerWeblink($explorerId, $weblinkId) {
  $explorerWeblink = ExplorerWeblink::getExplorerWeblink($explorerId, $weblinkId);
  return \Response::json($explorerWeblink);
 }

 public function createExplorerWeblink() {
  $explorerWeblink = ExplorerWeblink::createExplorerWeblink();
  return \Response::json($explorerWeblink);
 }

 public function editExplorerWeblink() {
  $explorerWeblink = ExplorerWeblink::editExplorerWeblink();
  return \Response::json($explorerWeblink);
 }

 //SWIPE
 public function getExplorerSwipes() {
  $explorerSwipes = ExplorerSwipe::getExplorerSwipes();
  return \Response::json($explorerSwipes);
 }

 public function getExplorerSwipe() {
  $explorerSwipe = ExplorerSwipe::getExplorerSwipe();
  return \Response::json($explorerSwipe);
 }

 public function createExplorerSwipe() {
  $explorerSwipe = ExplorerSwipe::createExplorerSwipe();
  return \Response::json($explorerSwipe);
 }

}
