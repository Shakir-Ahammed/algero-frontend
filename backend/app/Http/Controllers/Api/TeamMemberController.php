<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    /**
     * List all team members (public).
     */
    public function index()
    {
        $members = TeamMember::approved()->orderBy('sort_order')->orderBy('name')->get();
        return TeamMemberResource::collection($members);
    }

    /**
     * Get a single team member (public).
     */
    public function show(int $id)
    {
        $member = TeamMember::findOrFail($id);
        return new TeamMemberResource($member);
    }

    /**
     * Create a new team member (admin).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:150',
            'role'            => 'required|string|max:150',
            'bio'             => 'nullable|string',
            'image'           => 'nullable|string|max:500',
            'social_linkedin' => 'nullable|string|max:300',
            'social_twitter'  => 'nullable|string|max:300',
            'social_github'   => 'nullable|string|max:300',
            'sort_order'      => 'nullable|integer',
        ]);

        $member = TeamMember::create($validated);

        return (new TeamMemberResource($member))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Update a team member (admin).
     */
    public function update(Request $request, int $id)
    {
        $member = TeamMember::findOrFail($id);

        $validated = $request->validate([
            'name'            => 'sometimes|required|string|max:150',
            'role'            => 'sometimes|required|string|max:150',
            'bio'             => 'nullable|string',
            'image'           => 'nullable|string|max:500',
            'social_linkedin' => 'nullable|string|max:300',
            'social_twitter'  => 'nullable|string|max:300',
            'social_github'   => 'nullable|string|max:300',
            'sort_order'      => 'nullable|integer',
        ]);

        $member->update($validated);

        return new TeamMemberResource($member->fresh());
    }

    /**
     * Delete a team member (admin).
     */
    public function destroy(int $id)
    {
        $member = TeamMember::findOrFail($id);
        $member->delete();

        return response()->json(['message' => 'Team member deleted successfully.'], 200);
    }
}
