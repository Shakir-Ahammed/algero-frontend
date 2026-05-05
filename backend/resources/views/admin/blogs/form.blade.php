@extends('admin.layout')
@section('title', $blog ? 'Edit Blog' : 'New Blog')

@section('content')
<div class="page-header">
    <div>
        <h2>{{ $blog ? 'Edit Blog' : 'Create New Blog' }}</h2>
        <p>{{ $blog ? 'Update blog post details' : 'Write a new blog post' }}</p>
    </div>
    <a href="/admin/blogs" class="btn btn-sm btn-edit">← Back to Blogs</a>
</div>

<div class="card" style="padding: 32px;">
    <form method="POST" action="{{ $blog ? '/admin/blogs/' . $blog->id : '/admin/blogs' }}">
        @csrf
        @if($blog) @method('PUT') @endif

        <div class="form-grid">
            <div class="form-group">
                <label for="title">Title *</label>
                <input type="text" id="title" name="title" class="form-control"
                       value="{{ old('title', $blog?->title) }}" required placeholder="Blog post title">
            </div>

            <div class="form-group">
                <label for="category">Category *</label>
                <input type="text" id="category" name="category" class="form-control"
                       value="{{ old('category', $blog?->category) }}" required placeholder="e.g. Engineering, Design">
            </div>

            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" id="author" name="author" class="form-control"
                       value="{{ old('author', $blog?->author) }}" placeholder="Author name">
            </div>

            <div class="form-group">
                <label for="read_time">Read Time</label>
                <input type="text" id="read_time" name="read_time" class="form-control"
                       value="{{ old('read_time', $blog?->read_time ?? '5 min read') }}" placeholder="5 min read">
            </div>

            <div class="form-group full">
                <label>Cover Image</label>
                @include('admin.partials.upload', ['name' => 'image', 'value' => $blog?->image])
            </div>

            <div class="form-group full">
                <label for="excerpt">Excerpt</label>
                <textarea id="excerpt" name="excerpt" class="form-control" rows="3"
                          placeholder="Short summary of the blog post">{{ old('excerpt', $blog?->excerpt) }}</textarea>
            </div>

            <div class="form-group full">
                <label for="content">Content</label>
                <textarea id="content" name="content" class="form-control" rows="10"
                          placeholder="Full blog content (supports HTML)">{{ old('content', $blog?->content) }}</textarea>
            </div>

            <div class="form-group">
                <label for="published_at">Publish Date</label>
                <input type="datetime-local" id="published_at" name="published_at" class="form-control"
                       value="{{ old('published_at', $blog?->published_at?->format('Y-m-d\TH:i')) }}">
                <small style="color: var(--text-muted); margin-top: 4px; display: block;">Leave empty to save as draft</small>
            </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary">{{ $blog ? 'Update Blog' : 'Create Blog' }}</button>
            <a href="/admin/blogs" class="btn btn-edit">Cancel</a>
        </div>
    </form>
</div>
@endsection
