@extends('admin.layout')
@section('title', $member ? 'Edit Member' : 'Add Member')

@section('content')
<div class="page-header">
    <div>
        <h2>{{ $member ? 'Edit Team Member' : 'Add Team Member' }}</h2>
        <p>{{ $member ? 'Update member details' : 'Add a new team member' }}</p>
    </div>
    <a href="/admin/team" class="btn btn-sm btn-edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Back to Team
    </a>
</div>

<div class="card" style="padding: 32px;">
    <form method="POST" action="{{ $member ? '/admin/team/' . $member->id : '/admin/team' }}">
        @csrf
        @if($member) @method('PUT') @endif

        <div class="form-grid">
            <div class="form-group">
                <label for="name">Name *</label>
                <input type="text" id="name" name="name" class="form-control"
                       value="{{ old('name', $member?->name) }}" required placeholder="Full name">
            </div>

            <div class="form-group">
                <label for="role">Role *</label>
                <input type="text" id="role" name="role" class="form-control"
                       value="{{ old('role', $member?->role) }}" required placeholder="e.g. CTO, Head of Design">
            </div>

            <div class="form-group full">
                <label for="bio">Bio</label>
                <textarea id="bio" name="bio" class="form-control" rows="3"
                          placeholder="Short bio...">{{ old('bio', $member?->bio) }}</textarea>
            </div>

            <div class="form-group full">
                <label>Photo</label>
                @include('admin.partials.upload', ['name' => 'image', 'value' => $member?->image])
            </div>

            <div class="form-group">
                <label for="social_linkedin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:4px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn URL
                </label>
                <input type="text" id="social_linkedin" name="social_linkedin" class="form-control"
                       value="{{ old('social_linkedin', $member?->social_linkedin) }}" placeholder="https://linkedin.com/in/...">
            </div>

            <div class="form-group">
                <label for="social_twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:4px;"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    Twitter URL
                </label>
                <input type="text" id="social_twitter" name="social_twitter" class="form-control"
                       value="{{ old('social_twitter', $member?->social_twitter) }}" placeholder="https://twitter.com/...">
            </div>

            <div class="form-group">
                <label for="social_github">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:4px;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    GitHub URL
                </label>
                <input type="text" id="social_github" name="social_github" class="form-control"
                       value="{{ old('social_github', $member?->social_github) }}" placeholder="https://github.com/...">
            </div>

            <div class="form-group">
                <label for="sort_order">Sort Order</label>
                <input type="number" id="sort_order" name="sort_order" class="form-control"
                       value="{{ old('sort_order', $member?->sort_order ?? 0) }}" min="0">
            </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                {{ $member ? 'Update Member' : 'Add Member' }}
            </button>
            <a href="/admin/team" class="btn btn-edit">Cancel</a>
        </div>
    </form>
</div>
@endsection
