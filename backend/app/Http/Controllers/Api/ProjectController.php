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
        $projects = Project::active()
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
        $project = Project::active()->where('slug', $slug)->firstOrFail();

        return response()->json([
            'id'       => $project->id,
            'title'    => $project->title,
            'slug'     => $project->slug,
            'category' => $project->category,
            'image'    => $project->image,
            'desc'     => $project->description,
            'tech'     => $project->tech ?? [],
            'client'   => $project->client,
            'url'      => $project->url,
            'featured' => $project->is_featured,
        ]);
    }
}
