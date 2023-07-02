<?php

namespace App\Models;

use App\Models\Contact;
use App\Models\RequestType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Requests extends Model
{
    use HasFactory;

    protected $table='request';
    protected $primaryKey='requestID';

    /**
     * Get the contact that owns the Requests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contactID');
    }

    /**
     * Get the requestType that owns the Requests
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function requestType(): BelongsTo
    {
        return $this->belongsTo(RequestType::class, 'requestTypeID');
    }
}
