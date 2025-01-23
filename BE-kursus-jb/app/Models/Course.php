<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';
    protected $fillable = [
        'name',
        'price',
        'description',
        'thumbnail_path',
        'level',
        'user_id',
        'category_id',
        'program_id',
    ];

    public function user()
    {
      return $this->belongsTo(User::class);
    }

    public function category()
    {
      return $this->belongsTo(Category::class);
    }

    public function program()
    {
      return $this->belongsTo(Program::class);
    }

    public function material()
    {
      return $this->belongsTo(Material::class);
    }
}
