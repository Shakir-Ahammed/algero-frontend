@extends('admin.layout')
@section('title', 'Services')

@section('content')
<div class="page-header">
    <div>
        <h2>Services</h2>
        <p>Manage your service offerings</p>
    </div>
    <a href="/admin/services/create" class="btn btn-primary">+ Add Service</a>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>Service</th>
                <th>Icon</th>
                <th>Features</th>
                <th>Status</th>
                <th>Order</th>
                <th style="text-align:right">Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($services as $service)
            <tr>
                <td>
                    <strong>{{ $service->title }}</strong><br>
                    <small style="color: var(--text-muted);">{{ Str::limit($service->description, 50) }}</small>
                </td>
                <td style="font-size: 13px; color: var(--accent-hover);">{{ $service->icon }}</td>
                <td>
                    @if($service->features)
                        <small style="color: var(--text-muted);">{{ count($service->features) }} features</small>
                    @else
                        <small style="color: var(--text-muted);">—</small>
                    @endif
                </td>
                <td>
                    @if($service->is_active)
                        <span class="badge badge-active">Active</span>
                    @else
                        <span class="badge badge-inactive">Inactive</span>
                    @endif
                </td>
                <td>{{ $service->sort_order }}</td>
                <td>
                    <div class="btn-group" style="justify-content: flex-end;">
                        <a href="/admin/services/{{ $service->id }}/edit" class="btn btn-sm btn-edit">Edit</a>
                        <form method="POST" action="/admin/services/{{ $service->id }}" onsubmit="return confirm('Delete this service?')">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <div class="icon">⚙️</div>
                        <p>No services yet</p>
                        <a href="/admin/services/create" class="btn btn-primary">Add First Service</a>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
