@extends('admin.layout')
@section('title', 'Approval Management')

@section('content')
<div class="page-header">
    <div>
        <h2>Approval Management</h2>
        <p>Review and manage pending content and user activations</p>
    </div>
</div>

{{-- ─── Pending User Activations ─── --}}
<div class="card" style="margin-bottom: 28px;">
    <div class="card-header">
        <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:8px;color:var(--warning);"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            Pending User Activations
            @if($pendingUsers->count())
                <span class="badge badge-draft" style="margin-left:8px;">{{ $pendingUsers->count() }}</span>
            @endif
        </h3>
    </div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registered</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pendingUsers as $user)
            <tr>
                <td><strong>{{ $user->name }}</strong></td>
                <td>{{ $user->email }}</td>
                <td style="color:var(--text-muted);font-size:13px;">{{ $user->created_at->diffForHumans() }}</td>
                <td>
                    <div class="btn-group">
                        <form method="POST" action="/admin/users/{{ $user->id }}/activate" style="display:inline;">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-approve" title="Activate User">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                Activate
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:30px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:8px;display:block;margin:0 auto 8px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                No pending user activations
            </td></tr>
            @endforelse
        </tbody>
    </table>
</div>

{{-- ─── Pending Team Members ─── --}}
<div class="card" style="margin-bottom: 28px;">
    <div class="card-header">
        <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:8px;color:var(--accent);"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Pending Team Members
            @if($pendingTeam->count())
                <span class="badge badge-draft" style="margin-left:8px;">{{ $pendingTeam->count() }}</span>
            @endif
        </h3>
    </div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pendingTeam as $member)
            <tr>
                <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                        @if($member->image)
                            <img src="{{ $member->image }}" class="thumb" alt="">
                        @endif
                        <strong>{{ $member->name }}</strong>
                    </div>
                </td>
                <td>{{ $member->role }}</td>
                <td style="color:var(--text-muted);font-size:13px;">{{ $member->created_at->diffForHumans() }}</td>
                <td>
                    <div class="btn-group">
                        <form method="POST" action="/admin/approvals/team/{{ $member->id }}/approve" style="display:inline;">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-approve" title="Approve">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                Approve
                            </button>
                        </form>
                        <form method="POST" action="/admin/approvals/team/{{ $member->id }}/reject" style="display:inline;">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-danger" title="Reject">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                                Reject
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:30px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:8px;display:block;margin:0 auto 8px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                No pending team members
            </td></tr>
            @endforelse
        </tbody>
    </table>
</div>

{{-- ─── Pending Projects ─── --}}
<div class="card" style="margin-bottom: 28px;">
    <div class="card-header">
        <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:8px;color:var(--accent);"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Pending Projects
            @if($pendingProjects->count())
                <span class="badge badge-draft" style="margin-left:8px;">{{ $pendingProjects->count() }}</span>
            @endif
        </h3>
    </div>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Created</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pendingProjects as $project)
            <tr>
                <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                        @if($project->image)
                            <img src="{{ $project->image }}" class="thumb" alt="">
                        @endif
                        <strong>{{ Str::limit($project->title, 40) }}</strong>
                    </div>
                </td>
                <td><span class="badge badge-inactive">{{ $project->category }}</span></td>
                <td style="color:var(--text-muted);font-size:13px;">{{ $project->created_at->diffForHumans() }}</td>
                <td>
                    <div class="btn-group">
                        <form method="POST" action="/admin/approvals/project/{{ $project->id }}/approve" style="display:inline;">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-approve" title="Approve">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                Approve
                            </button>
                        </form>
                        <form method="POST" action="/admin/approvals/project/{{ $project->id }}/reject" style="display:inline;">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-danger" title="Reject">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                                Reject
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:30px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:8px;display:block;margin:0 auto 8px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                No pending projects
            </td></tr>
            @endforelse
        </tbody>
    </table>
</div>

{{-- ─── Pending Blog Posts ─── --}}
<div class="card" style="margin-bottom: 28px;">
    <div class="card-header">
        <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:8px;color:var(--accent);"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            Pending Blog Posts
            @if($pendingBlogs->count())
                <span class="badge badge-draft" style="margin-left:8px;">{{ $pendingBlogs->count() }}</span>
            @endif
        </h3>
    </div>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Created</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pendingBlogs as $blog)
            <tr>
                <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                        @if($blog->image)
                            <img src="{{ $blog->image }}" class="thumb" alt="">
                        @endif
                        <strong>{{ Str::limit($blog->title, 40) }}</strong>
                    </div>
                </td>
                <td><span class="badge badge-inactive">{{ $blog->category }}</span></td>
                <td>{{ $blog->author ?? '—' }}</td>
                <td style="color:var(--text-muted);font-size:13px;">{{ $blog->created_at->diffForHumans() }}</td>
                <td>
                    <div class="btn-group">
                        <form method="POST" action="/admin/approvals/blog/{{ $blog->id }}/approve" style="display:inline;">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-approve" title="Approve">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                Approve
                            </button>
                        </form>
                        <form method="POST" action="/admin/approvals/blog/{{ $blog->id }}/reject" style="display:inline;">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-danger" title="Reject">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                                Reject
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:30px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:8px;display:block;margin:0 auto 8px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                No pending blog posts
            </td></tr>
            @endforelse
        </tbody>
    </table>
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
