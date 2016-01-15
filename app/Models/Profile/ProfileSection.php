<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class ProfileSection extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_profile_section';

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

 public static function getProfileSections($type) {
  $profileSections = ProfileSection::orderBy('id', 'asc')
          ->where('type', $type)
          ->get();
  return $profileSections;
 }

}
