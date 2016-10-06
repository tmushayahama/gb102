<?php

namespace App\Http\Controllers;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\AppType\AppType;
use App\Models\Level\Level;
use App\Models\Icon\Icon;
use Request;
use DB;

class ConstantsController extends Controller {

 public function getConstants() {
  return \Response::json(Level::getConstants());
 }

 public function getLevel($category) {
  return \Response::json(Level::getLevel($category));
 }

}
