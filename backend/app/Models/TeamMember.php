<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'role',
        'bio',
        'image',
        'social_linkedin',
        'social_twitter',
        'social_github',
        'sort_order',
    ];

    /**
     * Get social links as a structured array (matches frontend TeamMember.social shape).
     */
    public function getSocialAttribute(): ?array
    {
        if (empty($this->social_linkedin) && empty($this->social_twitter) && empty($this->social_github)) {
            return null;
        }

        return [
            'linkedin' => $this->social_linkedin,
            'twitter'  => $this->social_twitter,
            'github'   => $this->social_github,
        ];
    }
}
