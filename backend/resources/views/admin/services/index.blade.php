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
                        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></div>
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
