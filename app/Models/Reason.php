<?php

namespace App\Models;

use App\Models\AnonMood;
use App\Models\StudentMood;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reason extends Model
{
    use HasFactory;

    protected $table='reason';
    protected $primaryKey='reasonID';

    /**
     * Get all of the studentMoods for the Reason
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function studentMood(): HasMany
    {
        return $this->hasMany(StudentMood::class, 'reasonID');
    }

    /**
     * Get all of the anonMoods for the Reason
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function anonMood(): HasMany
    {
        return $this->hasMany(AnonMood::class, 'reasonID');
    }
}
