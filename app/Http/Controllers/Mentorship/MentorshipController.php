<?php

namespace App\Http\Controllers\Mentorship;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Mentorship\Mentorship;

class MentorshipController extends Controller {

 /**
  * Get Request Suggestions of a component
  *
  * @param type $componentId
  * @param type $typeId the request type id
  * @return type json of request suggesstions
  */
 public function getRequestSuggestions($mentorshipId, $typeId) {
  $requestSuggestions = Mentorship::getRequestSuggestions($mentorshipId, $typeId);
  return \Response::json($requestSuggestions);
 }

 public function getMentorships($componentId) {
  $mentorships = Mentorship::getMentorships($componentId);
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

}
