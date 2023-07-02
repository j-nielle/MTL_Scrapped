<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnonMood extends Model
{
    use HasFactory;

    protected $table='anonmood';
    protected $primaryKey='anonID';

    /**
     * Get the mood that owns the AnonMood
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function mood(): BelongsTo
    {
        return $this->belongsTo(Mood::class, 'moodID');
    }

    /**
     * Get the reason that owns the AnonMood
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function reason(): BelongsTo
    {
        return $this->belongsTo(Reason::class, 'reasonID');
    }
}
