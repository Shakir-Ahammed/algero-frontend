@extends('admin.layout')
@section('title', 'Blogs')

@section('content')
<div class="page-header">
    <div>
        <h2>Blog Posts</h2>
        <p>Manage your blog content</p>
    </div>
    <a href="/admin/blogs/create" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        New Blog
    </a>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th style="text-align:right">Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($blogs as $blog)
            <tr>
                <td>
                    @if($blog->image)
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="{{ $blog->image }}" alt="" class="thumb">
                            <span>{{ Str::limit($blog->title, 40) }}</span>
                        </div>
                    @else
                        {{ Str::limit($blog->title, 40) }}
                    @endif
                </td>
                <td><span class="badge badge-active">{{ $blog->category }}</span></td>
                <td>{{ $blog->author ?? '—' }}</td>
                <td>
                    @if($blog->published_at)
                        <span class="badge badge-active">Published</span>
                    @else
                        <span class="badge badge-draft">Draft</span>
                    @endif
                </td>
                <td style="color: var(--text-muted); font-size: 13px;">{{ $blog->published_at?->format('M d, Y') ?? '—' }}</td>
                <td>
                    <div class="btn-group" style="justify-content: flex-end;">
                        <a href="/admin/blogs/{{ $blog->id }}/edit" class="btn btn-sm btn-edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                            Edit
                        </a>
                        <form method="POST" action="/admin/blogs/{{ $blog->id }}" onsubmit="return confirm('Delete this blog?')">
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
                <td colspan="6">
                    <div class="empty-state">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                        </div>
                        <p>No blog posts yet</p>
                        <a href="/admin/blogs/create" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            Create First Blog
                        </a>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
    @if($blogs->hasPages())
    <div class="pagination">
        @foreach($blogs->getUrlRange(1, $blogs->lastPage()) as $page => $url)
            @if($page == $blogs->currentPage())
                <span class="current">{{ $page }}</span>
            @else
                <a href="{{ $url }}">{{ $page }}</a>
            @endif
        @endforeach
    </div>
    @endif
</div>
@endsection
