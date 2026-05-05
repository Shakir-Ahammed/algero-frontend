@extends('admin.layout')
@section('title', 'Projects')

@section('content')
<div class="page-header">
    <div>
        <h2>Projects</h2>
        <p>Manage your portfolio & work showcase</p>
    </div>
    <a href="/admin/projects/create" class="btn btn-primary">+ Add Project</a>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Tech</th>
                <th>Status</th>
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
                        <div style="width:40px;height:40px;border-radius:8px;background:var(--bg-card);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:16px;">📁</div>
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
                    @if($project->is_featured)
                        <span class="badge badge-active">★ Featured</span>
                    @else
                        <span style="color:var(--text-muted);">—</span>
                    @endif
                </td>
                <td>
                    <div class="btn-group">
                        <a href="/admin/projects/{{ $project->id }}/edit" class="btn btn-sm btn-edit">Edit</a>
                        <form method="POST" action="/admin/projects/{{ $project->id }}" onsubmit="return confirm('Delete this project?')">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <div class="icon">🚀</div>
                        <p>No projects yet. Add your first portfolio piece!</p>
                        <a href="/admin/projects/create" class="btn btn-primary">Add Project</a>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
