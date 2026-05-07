<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * List all published blogs (public).
     */
    public function index(Request $request)
    {
        $blogs = Blog::approved()
            ->published()
            ->orderByDesc('published_at')
            ->paginate($request->get('per_page', 15));

        return BlogResource::collection($blogs);
    }

    /**
     * Get a single blog by slug (public).
     */
    public function show(string $slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();

        // Increment view count
        $blog->increment('views');

        return new BlogResource($blog);
    }

    /**
     * Create a new blog (admin).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'required|string|max:100',
            'excerpt'      => 'nullable|string',
            'content'      => 'nullable|string',
            'image'        => 'nullable|string|max:500',
            'author'       => 'nullable|string|max:150',
            'read_time'    => 'nullable|string|max:50',
            'published_at' => 'nullable|date',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        // Handle uniqueness — append ID suffix if slug exists
        if (Blog::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] .= '-' . Str::random(5);
        }

        $blog = Blog::create($validated);

        return (new BlogResource($blog))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update an existing blog (admin).
     */
    public function update(Request $request, int $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title'        => 'sometimes|required|string|max:255',
            'category'     => 'sometimes|required|string|max:100',
            'excerpt'      => 'nullable|string',
            'content'      => 'nullable|string',
            'image'        => 'nullable|string|max:500',
            'author'       => 'nullable|string|max:150',
            'read_time'    => 'nullable|string|max:50',
            'published_at' => 'nullable|date',
        ]);

        // Regenerate slug if title changed
        if (isset($validated['title']) && $validated['title'] !== $blog->title) {
            $newSlug = Str::slug($validated['title']);
            if (Blog::where('slug', $newSlug)->where('id', '!=', $id)->exists()) {
                $newSlug .= '-' . Str::random(5);
            }
            $validated['slug'] = $newSlug;
        }

        $blog->update($validated);

        return new BlogResource($blog->fresh());
    }

    /**
     * Delete a blog (admin).
     */
    public function destroy(int $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully.'], 200);
    }
}
