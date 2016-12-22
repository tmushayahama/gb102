<?php

namespace App\Models\User;

use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
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
 public static $rules = array(
     'firstname' => 'required',
     'lastname' => 'required',
     'email' => 'required|email|unique:gb_user'
 );
 public static $messages = array(
     'required' => 'The :attribute is required.',
     'unique' => 'The :email is already taken.'
 );

 public function skill() {
  return $this->hasMany('App\Models\Skill\Skill', 'creator_id');
 }

 public static function getAuthenticatedUserId() {
  if (JWTAuth::getToken()) {
   $user = JWTAuth::parseToken()->toUser();
   try {
    if (!$user = JWTAuth::parseToken()->authenticate()) {
     return response()->json(['user_not_found'], 404);
    }
   } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
    return null;
    //return response()->json(['token_expired'], $e->getStatusCode());
   } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
    return null;
    //return response()->json(['token_invalid'], $e->getStatusCode());
   } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
    return null;
    // return response()->json(['token_absent'], $e->getStatusCode());
   }
   // the token is valid and we have found the user via the sub claim
   return $user->id;
  }
  return null;
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

 public static function createUser() {
  $firstname = Request::get("firstname");
  $lastname = Request::get("lastname");
  $email = Request::get("email");

  $user = new User;
  $user->firstname = $firstname;
  $user->lastname = $lastname;
  $user->email = $email;
  // $user->avatar_url = 'gb_default_avatar.png';
  $user->password = Hash::make($lastname . 'apples');

  DB::beginTransaction();
  try {
   $user->save();
   $data = ['firstname' => $user->firstname, 'password' => $lastname . 'apples'];
   $data['messageLines'] = "Welcome";
   Mail::send('emails.betaregister', $data, function ($message) use ($user) {
    $message->subject('Welcome: ' . $user->firstname)
            ->to($user->email)
            ->replyTo('skillsection@gmail.com');
   });
  } catch (\Exception $e) {
//failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return array("message" => "Please check your email, an invitation message has been sent");
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
