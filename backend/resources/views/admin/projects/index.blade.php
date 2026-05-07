@extends('admin.layout')
@section('title', 'Projects')

@section('content')
<div class="page-header">
    <div>
        <h2>Projects</h2>
        <p>Manage your portfolio & work showcase</p>
    </div>
    <a href="/admin/projects/create" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Add Project
    </a>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Tech</th>
                <th>Active</th>
                <th>Approval</th>
                <th>Featured</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            @forelse($projects as $project)
            <tr>
                <td>
                    @if($project->image)
                        <img src="{{ $project->image }}" alt="" class="thumb">
                    @else
                        <div style="width:40px;height:40px;border-radius:8px;background:var(--bg-card);display:flex;align-items:center;justify-content:center;color:var(--text-muted);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>
                        </div>
                    @endif
                </td>
                <td><strong>{{ $project->title }}</strong></td>
                <td>{{ $project->category }}</td>
                <td>
                    @foreach(($project->tech ?? []) as $t)
                        <span class="badge badge-draft" style="margin-right:2px;">{{ $t }}</span>
                    @endforeach
                </td>
                <td>
                    <span class="badge {{ $project->is_active ? 'badge-active' : 'badge-inactive' }}">
                        {{ $project->is_active ? 'Active' : 'Inactive' }}
                    </span>
                </td>
                <td>
                    @if($project->status === 'approved')
                        <span class="badge badge-active">Approved</span>
                    @elseif($project->status === 'rejected')
                        <span class="badge badge-inactive">Rejected</span>
                    @else
                        <span class="badge badge-draft">Pending</span>
                    @endif
                </td>
                <td>
                    @if($project->is_featured)
                        <span class="badge badge-active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:2px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            Featured
                        </span>
                    @else
                        <span style="color:var(--text-muted);">—</span>
                    @endif
                </td>
                <td>
                    <div class="btn-group">
                        <a href="/admin/projects/{{ $project->id }}/edit" class="btn btn-sm btn-edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                            Edit
                        </a>
                        <form method="POST" action="/admin/projects/{{ $project->id }}" onsubmit="return confirm('Delete this project?')">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                Delete
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="8">
                    <div class="empty-state">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        </div>
                        <p>No projects yet. Add your first portfolio piece!</p>
                        <a href="/admin/projects/create" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            Add Project
                        </a>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
