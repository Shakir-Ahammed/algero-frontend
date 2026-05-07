<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'category'     => $this->category,
            'excerpt'      => $this->excerpt,
            'content'      => $this->content,
            'image'        => $this->image,
            'images'       => $this->images ?? [],
            'author'       => $this->author,
            'read'         => $this->read_time,
            'views'        => $this->views ?? 0,
            'date'         => $this->published_at?->format('M d, Y'),
            'published_at' => $this->published_at?->toISOString(),
            'created_at'   => $this->created_at->toISOString(),
            'updated_at'   => $this->updated_at->toISOString(),
        ];
    }
}
