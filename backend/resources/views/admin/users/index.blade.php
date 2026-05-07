@extends('admin.layout')
@section('title', 'User Management')

@section('content')
<div class="page-header">
    <div>
        <h2>User Management</h2>
        <p>Manage admin user accounts — activate or deactivate access</p>
    </div>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Registered</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($users as $user)
            <tr>
                <td><strong>{{ $user->name }}</strong></td>
                <td>{{ $user->email }}</td>
                <td>
                    <span class="badge badge-inactive" style="text-transform:capitalize;">{{ str_replace('_', ' ', $user->role) }}</span>
                </td>
                <td>
                    @if($user->is_active)
                        <span class="badge badge-active">Active</span>
                    @else
                        <span class="badge badge-draft">Inactive</span>
                    @endif
                </td>
                <td style="color:var(--text-muted);font-size:13px;">{{ $user->created_at->diffForHumans() }}</td>
                <td>
                    <div class="btn-group">
                        @if($user->is_active)
                            <form method="POST" action="/admin/users/{{ $user->id }}/deactivate" style="display:inline;">
                                @csrf
                                <button type="submit" class="btn btn-sm btn-danger" title="Deactivate"
                                        onclick="return confirm('Are you sure you want to deactivate this user?')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>
                                    Deactivate
                                </button>
                            </form>
                        @else
                            <form method="POST" action="/admin/users/{{ $user->id }}/activate" style="display:inline;">
                                @csrf
                                <button type="submit" class="btn btn-sm btn-approve" title="Activate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Activate
                                </button>
                            </form>
                        @endif
                    </div>
                </td>
            </tr>
            @empty
            <tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:40px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <p style="font-size:15px;">No users found</p>
            </td></tr>
            @endforelse
        </tbody>
    </table>
    @if($users->hasPages())
    <div class="pagination">
        {{ $users->links('pagination::simple-default') }}
    </div>
    @endif
</div>

@push('styles')
<style>
    .btn-approve {
        background: rgba(34, 197, 94, 0.12);
        color: var(--success);
    }
    .btn-approve:hover {
        background: rgba(34, 197, 94, 0.25);
        color: #4ade80;
    }
</style>
@endpush
@endsection
