<?php

namespace App\Http\Controllers;

//use Illuminate\Contracts\Auth;
use JWTAuth;
//use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Explorer\Explorer;
use App\Models\AppType\AppType;
use App\Models\Level\Level;
use App\Models\Icon\Icon;
use Request;
use DB;

class SearchController extends Controller {

 function simpleSearch() {
  $keyword = Request::get("query");
  $results = Explorer::SearchByKeyword($keyword)
          ->take(100)
          ->with('app_type')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->get();
  return \Response::json($results);
 }

 function suggestionSearch() {
  $keyword = Request::get("query");
  $results = Explorer::SearchByKeyword($keyword)
          ->take(10)
          ->with('app_type')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->get();
  return \Response::json($results);
 }

 public function getAppTypes() {
  $appType = AppType::getAppTypes();
  return \Response::json($appType);
 }

 public function getSubLevels($category) {
  $level = Level::getSubLevels($category);
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
