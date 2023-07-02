<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StudentMood extends Model
{
    use HasFactory;

    protected $table='studentmood';
    protected $primaryKey='studentmoodID';

    /**
     * Get the student that owns the StudentMood
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'studentID');
    }

    /**
     * Get the mood that owns the StudentMood
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function mood(): BelongsTo
    {
        return $this->belongsTo(Mood::class, 'moodID');
    }

    /**
     * Get the reason that owns the StudentMood
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function reason(): BelongsTo
    {
        return $this->belongsTo(Reason::class, 'reasonID');
    }
}
