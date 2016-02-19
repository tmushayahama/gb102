<?php

namespace App\Http\Controllers\Profile;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use App\Models\User\User;
use App\Models\User\UserProfileSection;
use App\Models\Profile\ProfileProgress;
use App\Models\Profile\ProfileComment;
use App\Models\Profile\ProfileNote;
use App\Models\Profile\ProfileTodo;
use App\Models\Profile\ProfileWeblink;
use App\Models\Todo\Todo;
use App\Models\Todo\TodoChecklist;
use App\Models\Progress\Progress;
use App\Models\Comment\Comment;
use App\Models\Note\Note;
use App\Models\Weblink\Weblink;
use App\Models\Profile\ProfileSwipe;
use Request;
use DB;

class ProfileController extends Controller {

 public function getProfile($id) {
  $profile = User::getProfile($id);
  return \Response::json($profile);
 }

 public function getUserProfileSections($id) {
  $userProfileSections = UserProfileSection::getUserProfileSections($id);
  return \Response::json($userProfileSections);
 }

 public function createProfile() {
  $profile = Profile::createProfile();
  return \Response::json($profile);
 }

 public function editProfile() {
  $profile = Profile::editProfile();
  return \Response::json($profile);
 }

 /* TODOS */

 public function getProfileTodos($profileId) {
  $profileTodos = ProfileTodo::getProfileTodos($profileId);
  return \Response::json($profileTodos);
 }

 public function getProfileTodo($profileId, $todoId) {
  $profileTodo = ProfileTodo::getProfileTodo($profileId, $todoId);
  return \Response::json($profileTodo);
 }

 public function createProfileTodo() {
  $profileTodo = ProfileTodo::createProfileTodo();
  return \Response::json($profileTodo);
 }

 public function editProfileTodo() {
  $profileTodo = ProfileTodo::editProfileTodo();
  return \Response::json($profileTodo);
 }

 public function getProfileTodoChecklist($todoId) {
  $todoChecklists = TodoChecklist::getTodoChecklist($todoId);
  return \Response::json($todoChecklists);
 }

 public function createProfileTodoChecklist() {
  $todoChecklist = TodoChecklist::createTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function editProfileTodoChecklist() {
  $todoChecklist = TodoChecklist::editTodoChecklist();
  return \Response::json($todoChecklist);
 }

 public function getProfileNotes($profileId) {
  $profileNotes = ProfileNote::getProfileNotes($profileId);
  return \Response::json($profileNotes);
 }

 public function getProfileNote($profileId, $noteId) {
  $profileNote = ProfileNote::getProfileNote($profileId, $noteId);
  return \Response::json($profileNote);
 }

 public function createProfileNote() {
  $profileNote = ProfileNote::createProfileNote();
  return \Response::json($profileNote);
 }

 public function editProfileNote() {
  $profileNote = ProfileNote::editProfileNote();
  return \Response::json($profileNote);
 }

 public function getProfileComments($profileId) {
  $profileComments = ProfileComment::getProfileComments($profileId);
  return \Response::json($profileComments);
 }

 public function getProfileComment($profileId, $commentId) {
  $profileComment = ProfileComment::getProfileComment($profileId, $commentId);
  return \Response::json($profileComment);
 }

 public function createProfileComment() {
  $profileComment = ProfileComment::createProfileComment();
  return \Response::json($profileComment);
 }

 public function editProfileComment() {
  $profileComment = ProfileComment::editProfileComment();
  return \Response::json($profileComment);
 }

 public function getProfileWeblinks($profileId) {
  $profileWeblinks = ProfileWeblink::getProfileWeblinks($profileId);
  return \Response::json($profileWeblinks);
 }

 public function getProfileWeblink($profileId, $weblinkId) {
  $profileWeblink = ProfileWeblink::getProfileWeblink($profileId, $weblinkId);
  return \Response::json($profileWeblink);
 }

 public function createProfileWeblink() {
  $profileWeblink = ProfileWeblink::createProfileWeblink();
  return \Response::json($profileWeblink);
 }

 public function editProfileWeblink() {
  $profileWeblink = ProfileWeblink::editProfileWeblink();
  return \Response::json($profileWeblink);
 }

 //SWIPE
 public function getProfileSwipes() {
  $profileSwipes = ProfileSwipe::getProfileSwipes();
  return \Response::json($profileSwipes);
 }

 public function getProfileSwipe() {
  $profileSwipe = ProfileSwipe::getProfileSwipe();
  return \Response::json($profileSwipe);
 }

 public function createProfileSwipe() {
  $profileSwipe = ProfileSwipe::createProfileSwipe();
  return \Response::json($profileSwipe);
 }

}
