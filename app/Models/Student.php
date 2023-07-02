<?php

namespace App\Models;

use App\Models\StudentMood;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $table='student';
    protected $primaryKey='studentID';

    /**
     * Get all of the studentMoods for the Student
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function studentMood(): HasMany
    {
        return $this->hasMany(StudentMood::class, 'studentID');
    }
}
