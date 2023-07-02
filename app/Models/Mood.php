<?php

namespace App\Models;

use App\Models\AnonMood;
use App\Models\StudentMood;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mood extends Model
{
    use HasFactory;

    protected $table='mood';
    protected $primaryKey='moodID';
    
    /**
     * Get all of the studentMoods for the Mood
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function studentMood(): HasMany
    {
        return $this->hasMany(StudentMood::class, 'moodID');
    }

    /**
     * Get all of the anonMoods for the Mood
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function anonMood(): HasMany
    {
        return $this->hasMany(AnonMood::class, 'moodID');
    }

}
