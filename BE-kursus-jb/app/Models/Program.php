<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Program extends Model
{
    use HasFactory;

    public function user()
    {
      return $this->belongsTo(User::class);
    }
    
    public function courses()
    {
        return $this->hasOne(Course::class);
    }
}
