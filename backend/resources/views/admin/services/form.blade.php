@extends('admin.layout')
@section('title', $service ? 'Edit Service' : 'Add Service')

@section('content')
<div class="page-header">
    <div>
        <h2>{{ $service ? 'Edit Service' : 'Add New Service' }}</h2>
    </div>
    <a href="/admin/services" class="btn btn-sm btn-edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Back
    </a>
</div>

<div class="card" style="padding: 32px;">
    <form method="POST" action="{{ $service ? '/admin/services/' . $service->id : '/admin/services' }}">
        @csrf
        @if($service) @method('PUT') @endif

        <div class="form-grid">
            <div class="form-group">
                <label for="title">Title *</label>
                <input type="text" id="title" name="title" class="form-control"
                       value="{{ old('title', $service?->title) }}" required>
            </div>
            <div class="form-group">
                <label for="icon">Icon Name</label>
                <input type="text" id="icon" name="icon" class="form-control"
                       value="{{ old('icon', $service?->icon ?? 'Layers') }}">
            </div>
            <div class="form-group full">
                <label for="description">Description *</label>
                <textarea id="description" name="description" class="form-control" rows="3" required>{{ old('description', $service?->description) }}</textarea>
            </div>
            <div class="form-group full">
                <label for="features">Features (one per line)</label>
                <textarea id="features" name="features" class="form-control" rows="5">{{ old('features', $service?->features ? implode("\n", $service->features) : '') }}</textarea>
            </div>
            <div class="form-group">
                <label for="sort_order">Sort Order</label>
                <input type="number" id="sort_order" name="sort_order" class="form-control"
                       value="{{ old('sort_order', $service?->sort_order ?? 0) }}">
            </div>
            <div class="form-group">
                <label>&nbsp;</label>
                <div class="checkbox-row">
                    <input type="checkbox" id="is_active" name="is_active"
                           {{ old('is_active', $service?->is_active ?? true) ? 'checked' : '' }}>
                    <label for="is_active" style="text-transform:none;letter-spacing:0;font-size:14px;color:var(--text-primary);">Active</label>
                </div>
            </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                {{ $service ? 'Update' : 'Create' }}
            </button>
            <a href="/admin/services" class="btn btn-edit">Cancel</a>
        </div>
    </form>
</div>
@endsection
