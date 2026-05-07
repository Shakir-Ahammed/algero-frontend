<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * List all active projects.
     */
    public function index()
    {
        $projects = Project::approved()
            ->active()
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn ($p) => [
                'id'       => $p->id,
                'title'    => $p->title,
                'slug'     => $p->slug,
                'category' => $p->category,
                'image'    => $p->image,
                'desc'     => $p->description,
                'tech'     => $p->tech ?? [],
                'client'   => $p->client,
                'url'      => $p->url,
                'featured' => $p->is_featured,
            ]);

        return response()->json($projects);
    }

    /**
     * Show a single project by slug.
     */
    public function show(string $slug)
    {
        $project = Project::approved()->active()->where('slug', $slug)->firstOrFail();

        // Increment view count
        $project->increment('views');

        return response()->json([
            'id'         => $project->id,
            'title'      => $project->title,
            'slug'       => $project->slug,
            'category'   => $project->category,
            'image'      => $project->image,
            'images'     => $project->images ?? [],
            'desc'       => $project->description,
            'content'    => $project->content,
            'tech'       => $project->tech ?? [],
            'client'     => $project->client,
            'url'        => $project->url,
            'github_url' => $project->github_url,
            'demo_url'   => $project->demo_url,
            'featured'   => $project->is_featured,
            'created_at' => $project->created_at->toISOString(),
        ]);
    }
}
