@extends('admin.layout')
@section('title', $project ? 'Edit Project' : 'Add Project')

@section('content')
<div class="page-header">
    <div>
        <h2>{{ $project ? 'Edit Project' : 'Add New Project' }}</h2>
        <p>{{ $project ? 'Update project details' : 'Add a new portfolio project' }}</p>
    </div>
    <a href="/admin/projects" class="btn btn-sm btn-edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Back to Projects
    </a>
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
                <label>Cover Image</label>
                @include('admin.partials.upload', ['name' => 'image', 'value' => $project?->image])
            </div>

            <div class="form-group full">
                <label>Gallery Images</label>
                @include('admin.partials.multi-upload', ['name' => 'images', 'value' => $project?->images])
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
                        <label for="is_featured" style="text-transform:none;letter-spacing:0;font-size:14px;color:var(--text-primary);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;color:var(--warning);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            Featured
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                {{ $project ? 'Update Project' : 'Create Project' }}
            </button>
            <a href="/admin/projects" class="btn btn-edit">Cancel</a>
        </div>
    </form>
</div>
@endsection
