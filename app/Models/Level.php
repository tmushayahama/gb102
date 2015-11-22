<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Level extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_level';

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = [];

}
