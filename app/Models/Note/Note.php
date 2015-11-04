<?php

namespace App\Models\Note;

use Illuminate\Database\Eloquent\Model;

class Note extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_note';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['description'];

}
