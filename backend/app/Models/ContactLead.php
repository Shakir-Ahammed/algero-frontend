<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactLead extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'message',
        'status',
    ];

    /**
     * Get full name.
     */
    public function getFullNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    /**
     * Scope: only new leads.
     */
    public function scopeStatusNew($query)
    {
        return $query->where('status', 'new');
    }
}
