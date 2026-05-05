@extends('admin.layout')
@section('title', 'Blogs')

@section('content')
<div class="page-header">
    <div>
        <h2>Blog Posts</h2>
        <p>Manage your blog content</p>
    </div>
    <a href="/admin/blogs/create" class="btn btn-primary">+ New Blog</a>
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
                        <a href="/admin/blogs/{{ $blog->id }}/edit" class="btn btn-sm btn-edit">Edit</a>
                        <form method="POST" action="/admin/blogs/{{ $blog->id }}" onsubmit="return confirm('Delete this blog?')">
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
                        <div class="icon">📝</div>
                        <p>No blog posts yet</p>
                        <a href="/admin/blogs/create" class="btn btn-primary">Create First Blog</a>
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
