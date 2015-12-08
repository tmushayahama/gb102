<?php

namespace App\Http\Controllers\Skill;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Level\Level;
use Request;
use DB;

class LevelController extends Controller {

 public function getLevels($code) {
  $level = Level::getLevel($code);
  return \Response::json($level);
 }

}
