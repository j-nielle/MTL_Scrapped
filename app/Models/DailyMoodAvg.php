<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyMoodAvg extends Model
{
    use HasFactory;

    protected $table = 'avgDailyMood';
}
