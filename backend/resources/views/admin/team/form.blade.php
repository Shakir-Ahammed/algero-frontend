@extends('admin.layout')
@section('title', $member ? 'Edit Member' : 'Add Member')

@section('content')
<div class="page-header">
    <div>
        <h2>{{ $member ? 'Edit Team Member' : 'Add Team Member' }}</h2>
        <p>{{ $member ? 'Update member details' : 'Add a new team member' }}</p>
    </div>
    <a href="/admin/team" class="btn btn-sm btn-edit">← Back to Team</a>
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
                <label for="image">Image URL</label>
                <input type="text" id="image" name="image" class="form-control"
                       value="{{ old('image', $member?->image) }}" placeholder="https://images.unsplash.com/...">
            </div>

            <div class="form-group">
                <label for="social_linkedin">LinkedIn URL</label>
                <input type="text" id="social_linkedin" name="social_linkedin" class="form-control"
                       value="{{ old('social_linkedin', $member?->social_linkedin) }}" placeholder="https://linkedin.com/in/...">
            </div>

            <div class="form-group">
                <label for="social_twitter">Twitter URL</label>
                <input type="text" id="social_twitter" name="social_twitter" class="form-control"
                       value="{{ old('social_twitter', $member?->social_twitter) }}" placeholder="https://twitter.com/...">
            </div>

            <div class="form-group">
                <label for="social_github">GitHub URL</label>
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
            <button type="submit" class="btn btn-primary">{{ $member ? 'Update Member' : 'Add Member' }}</button>
            <a href="/admin/team" class="btn btn-edit">Cancel</a>
        </div>
    </form>
</div>
@endsection
