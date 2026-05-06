<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'image',
        'images',
        'description',
        'tech',
        'client',
        'url',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'tech'        => 'array',
        'images'      => 'array',
        'is_featured' => 'boolean',
        'is_active'   => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Project $project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
