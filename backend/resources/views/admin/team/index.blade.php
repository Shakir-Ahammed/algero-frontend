@extends('admin.layout')
@section('title', 'Team Members')

@section('content')
<div class="page-header">
    <div>
        <h2>Team Members</h2>
        <p>Manage your team</p>
    </div>
    <a href="/admin/team/create" class="btn btn-primary">+ Add Member</a>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Order</th>
                <th style="text-align:right">Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($members as $member)
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        @if($member->image)
                            <img src="{{ $member->image }}" alt="" class="thumb" style="border-radius: 50%;">
                        @endif
                        <div>
                            <strong>{{ $member->name }}</strong><br>
                            <small style="color: var(--text-muted);">{{ Str::limit($member->bio, 50) }}</small>
                        </div>
                    </div>
                </td>
                <td>{{ $member->role }}</td>
                <td>{{ $member->sort_order }}</td>
                <td>
                    <div class="btn-group" style="justify-content: flex-end;">
                        <a href="/admin/team/{{ $member->id }}/edit" class="btn btn-sm btn-edit">Edit</a>
                        <form method="POST" action="/admin/team/{{ $member->id }}" onsubmit="return confirm('Remove this team member?')">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="4">
                    <div class="empty-state">
                        <div class="icon">👥</div>
                        <p>No team members yet</p>
                        <a href="/admin/team/create" class="btn btn-primary">Add First Member</a>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
