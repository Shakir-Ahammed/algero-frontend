<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * List all active services (public).
     */
    public function index()
    {
        $services = Service::active()->orderBy('sort_order')->get();
        return ServiceResource::collection($services);
    }

    /**
     * Get a single service by slug (public).
     */
    public function show(string $slug)
    {
        $service = Service::where('slug', $slug)->firstOrFail();
        return new ServiceResource($service);
    }

    /**
     * Create a new service (admin).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:200',
            'description' => 'required|string',
            'icon'        => 'nullable|string|max:100',
            'features'    => 'nullable|array',
            'features.*'  => 'string',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if (Service::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] .= '-' . Str::random(5);
        }

        $service = Service::create($validated);

        return (new ServiceResource($service))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update a service (admin).
     */
    public function update(Request $request, int $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:200',
            'description' => 'sometimes|required|string',
            'icon'        => 'nullable|string|max:100',
            'features'    => 'nullable|array',
            'features.*'  => 'string',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);

        if (isset($validated['title']) && $validated['title'] !== $service->title) {
            $newSlug = Str::slug($validated['title']);
            if (Service::where('slug', $newSlug)->where('id', '!=', $id)->exists()) {
                $newSlug .= '-' . Str::random(5);
            }
            $validated['slug'] = $newSlug;
        }

        $service->update($validated);

        return new ServiceResource($service->fresh());
    }

    /**
     * Delete a service (admin).
     */
    public function destroy(int $id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'Service deleted successfully.'], 200);
    }
}
