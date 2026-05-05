@extends('admin.layout')
@section('title', $project ? 'Edit Project' : 'Add Project')

@section('content')
<div class="page-header">
    <div>
        <h2>{{ $project ? 'Edit Project' : 'Add New Project' }}</h2>
        <p>{{ $project ? 'Update project details' : 'Add a new portfolio project' }}</p>
    </div>
    <a href="/admin/projects" class="btn btn-sm btn-edit">← Back to Projects</a>
</div>

<div class="card" style="padding: 32px;">
    <form method="POST" action="{{ $project ? '/admin/projects/' . $project->id : '/admin/projects' }}">
        @csrf
        @if($project) @method('PUT') @endif

        <div class="form-grid">
            <div class="form-group">
                <label for="title">Title *</label>
                <input type="text" id="title" name="title" class="form-control"
                       value="{{ old('title', $project?->title) }}" required placeholder="e.g. Fintech Dashboard">
            </div>

            <div class="form-group">
                <label for="category">Category *</label>
                <select id="category" name="category" class="form-control">
                    @foreach(['Web App', 'Mobile App', 'UI/UX', 'DevOps', 'Other'] as $cat)
                        <option value="{{ $cat }}" {{ old('category', $project?->category) === $cat ? 'selected' : '' }}>{{ $cat }}</option>
                    @endforeach
                </select>
            </div>

            <div class="form-group full">
                <label>Project Image</label>
                @include('admin.partials.upload', ['name' => 'image', 'value' => $project?->image])
            </div>

            <div class="form-group full">
                <label for="description">Description</label>
                <textarea id="description" name="description" class="form-control" rows="3"
                          placeholder="Brief project description...">{{ old('description', $project?->description) }}</textarea>
            </div>

            <div class="form-group full">
                <label for="tech">Tech Stack (comma separated)</label>
                <input type="text" id="tech" name="tech" class="form-control"
                       value="{{ old('tech', $project?->tech ? implode(', ', $project->tech) : '') }}"
                       placeholder="React, Node.js, PostgreSQL">
            </div>

            <div class="form-group">
                <label for="client">Client</label>
                <input type="text" id="client" name="client" class="form-control"
                       value="{{ old('client', $project?->client) }}" placeholder="Client name">
            </div>

            <div class="form-group">
                <label for="url">Project URL</label>
                <input type="text" id="url" name="url" class="form-control"
                       value="{{ old('url', $project?->url) }}" placeholder="https://project-demo.com">
            </div>

            <div class="form-group">
                <label for="sort_order">Sort Order</label>
                <input type="number" id="sort_order" name="sort_order" class="form-control"
                       value="{{ old('sort_order', $project?->sort_order ?? 0) }}" min="0">
            </div>

            <div class="form-group">
                <label>&nbsp;</label>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div class="checkbox-row">
                        <input type="checkbox" id="is_active" name="is_active"
                               {{ old('is_active', $project?->is_active ?? true) ? 'checked' : '' }}>
                        <label for="is_active" style="text-transform:none;letter-spacing:0;font-size:14px;color:var(--text-primary);">Active</label>
                    </div>
                    <div class="checkbox-row">
                        <input type="checkbox" id="is_featured" name="is_featured"
                               {{ old('is_featured', $project?->is_featured ?? false) ? 'checked' : '' }}>
                        <label for="is_featured" style="text-transform:none;letter-spacing:0;font-size:14px;color:var(--text-primary);">★ Featured</label>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary">{{ $project ? 'Update Project' : 'Create Project' }}</button>
            <a href="/admin/projects" class="btn btn-edit">Cancel</a>
        </div>
    </form>
</div>
@endsection
