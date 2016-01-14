<?php

namespace App\Models\User;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Request;
use DB;
use JWTAuth;

class User extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract {

 use Authenticatable,
     Authorizable,
     CanResetPassword;

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_user';

 public function skill() {
  return $this->hasMany('App\Models\Skill\Skill', 'creator_id');
 }

 public static function getProfile($id) {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $profile;
  if ($userId) {
   if ($userId == $id) {
    $profile = User::find($id);
   } else {
    $profile = User::find($id);
   }
   return $profile;
  }
  $profile = User::find($id);
  return $profile;
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['name', 'email', 'password'];

 /**
  * The attributes excluded from the model's JSON form.
  *
  * @var array
  */
 protected $hidden = ['password', 'remember_token'];

}
