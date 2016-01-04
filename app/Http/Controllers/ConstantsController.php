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

 public function getAppTypes() {
  $appType = AppType::getAppTypes();
  return \Response::json($appType);
 }

 public function getLevel($category) {
  $level = Level::getLevel($category);
  return \Response::json($level);
 }

 public function getLevelByCode($code) {
  $level = Level::getLevelByCode($code);
  return \Response::json($level);
 }

 public function getIcons($type) {
  $icons = Icon::getIcons($type);
  return \Response::json($icons);
 }

}
