@extends('admin.layout')
@section('title', $blog ? 'Edit Blog' : 'New Blog')

@push('styles')
<link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/44.3.0/ckeditor5.css" />
<style>
    /* ── CKEditor Dark Theme Override ── */
    .ck.ck-editor__main>.ck-editor__editable {
        background: rgba(3, 7, 18, 0.5) !important;
        color: #f9fafb !important;
        border: 1px solid var(--border) !important;
        border-top: none !important;
        border-radius: 0 0 var(--radius-sm) var(--radius-sm) !important;
        min-height: 350px;
        font-family: 'Inter', -apple-system, sans-serif;
        font-size: 14px;
        line-height: 1.8;
        padding: 16px 20px !important;
    }
    .ck.ck-editor__main>.ck-editor__editable:focus {
        border-color: var(--accent) !important;
        box-shadow: 0 0 0 3px var(--accent-glow) !important;
    }
    .ck.ck-toolbar {
        background: rgba(17, 24, 39, 0.9) !important;
        border: 1px solid var(--border) !important;
        border-radius: var(--radius-sm) var(--radius-sm) 0 0 !important;
    }
    .ck.ck-toolbar .ck-button,
    .ck.ck-toolbar .ck-dropdown__button {
        color: var(--text-secondary) !important;
    }
    .ck.ck-toolbar .ck-button:hover,
    .ck.ck-toolbar .ck-dropdown__button:hover {
        background: var(--accent-glow) !important;
        color: var(--accent-hover) !important;
    }
    .ck.ck-toolbar .ck-button.ck-on {
        background: var(--accent-glow) !important;
        color: var(--accent) !important;
    }
    .ck.ck-button__label { color: inherit !important; }
    .ck.ck-icon { color: inherit !important; }
    .ck.ck-toolbar__separator { background: var(--border) !important; }

    /* Dropdown panels */
    .ck.ck-dropdown__panel,
    .ck.ck-list {
        background: rgba(17, 24, 39, 0.98) !important;
        border: 1px solid var(--border) !important;
    }
    .ck.ck-list__item .ck-button {
        color: var(--text-secondary) !important;
    }
    .ck.ck-list__item .ck-button:hover {
        background: var(--accent-glow) !important;
        color: var(--accent-hover) !important;
    }

    /* Content styling inside editor */
    .ck-editor__editable h2 { font-size: 1.5em; font-weight: 700; margin-top: 1.2em; color: #f1f5f9; font-family: 'Space Grotesk', sans-serif; }
    .ck-editor__editable h3 { font-size: 1.25em; font-weight: 600; margin-top: 1em; color: #e2e8f0; font-family: 'Space Grotesk', sans-serif; }
    .ck-editor__editable p { color: #94a3b8; margin-bottom: 0.8em; }
    .ck-editor__editable a { color: var(--accent-hover); }
    .ck-editor__editable blockquote {
        border-left: 3px solid var(--accent);
        background: rgba(59, 130, 246, 0.06);
        padding: 12px 16px;
        border-radius: 0 8px 8px 0;
        font-style: italic;
        color: #93c5fd;
    }
    .ck-editor__editable ul li, .ck-editor__editable ol li { color: #94a3b8; }
    .ck-editor__editable code {
        background: rgba(59, 130, 246, 0.1);
        color: #93c5fd;
        padding: 1px 5px;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9em;
    }
    .ck-editor__editable pre {
        background: rgba(15, 23, 42, 0.8) !important;
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 14px;
        color: #e2e8f0 !important;
    }
    .ck-editor__editable pre code {
        background: none;
        padding: 0;
        color: #e2e8f0;
    }
    .ck-editor__editable strong { color: #e2e8f0; }
    .ck-editor__editable table { border-collapse: collapse; width: 100%; }
    .ck-editor__editable td, .ck-editor__editable th {
        border: 1px solid var(--border);
        padding: 8px 12px;
        color: #94a3b8;
    }
    .ck-editor__editable th { background: rgba(17, 24, 39, 0.5); color: var(--text-primary); font-weight: 600; }
    .ck-editor__editable img { max-width: 100%; border-radius: 8px; }

    /* Word count */
    .ck-word-count { display: flex; gap: 16px; justify-content: flex-end; padding: 8px 0; }
    .ck-word-count .ck-word-count__words,
    .ck-word-count .ck-word-count__characters { color: var(--text-muted); font-size: 12px; }

    /* Editor wrapper */
    .editor-wrapper { position: relative; }
    .editor-toolbar-hint {
        font-size: 11px;
        color: var(--text-muted);
        margin-top: 6px;
    }

    /* Balloon panels (link, image) */
    .ck.ck-balloon-panel {
        background: rgba(17, 24, 39, 0.98) !important;
        border: 1px solid var(--border) !important;
    }
    .ck.ck-balloon-panel .ck-input {
        background: rgba(3, 7, 18, 0.5) !important;
        border: 1px solid var(--border) !important;
        color: var(--text-primary) !important;
    }
    .ck.ck-balloon-panel .ck-input:focus {
        border-color: var(--accent) !important;
    }
    .ck.ck-balloon-panel .ck-button {
        color: var(--text-secondary) !important;
    }
    .ck.ck-balloon-panel .ck-button:hover {
        background: var(--accent-glow) !important;
        color: var(--accent-hover) !important;
    }
    .ck.ck-labeled-field-view__status {
        color: var(--text-muted) !important;
    }
</style>
@endpush

@section('content')
<div class="page-header">
    <div>
        <h2>{{ $blog ? 'Edit Blog' : 'Create New Blog' }}</h2>
        <p>{{ $blog ? 'Update blog post details' : 'Write a new blog post' }}</p>
    </div>
    <a href="/admin/blogs" class="btn btn-sm btn-edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Back to Blogs
    </a>
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
                <label>Gallery Images</label>
                @include('admin.partials.multi-upload', ['name' => 'images', 'value' => $blog?->images])
            </div>

            <div class="form-group full">
                <label for="excerpt">Excerpt</label>
                <textarea id="excerpt" name="excerpt" class="form-control" rows="3"
                          placeholder="Short summary of the blog post">{{ old('excerpt', $blog?->excerpt) }}</textarea>
            </div>

            <div class="form-group full">
                <label for="content">Content</label>
                <div class="editor-wrapper">
                    <textarea id="content" name="content" style="display:none;">{{ old('content', $blog?->content) }}</textarea>
                    <div id="editor-container"></div>
                </div>
                <p class="editor-toolbar-hint">Use the toolbar to format text, add headings, lists, links, images, code blocks, and tables.</p>
            </div>

            <div class="form-group">
                <label for="published_at">Publish Date</label>
                <input type="datetime-local" id="published_at" name="published_at" class="form-control"
                       value="{{ old('published_at', $blog?->published_at?->format('Y-m-d\TH:i')) }}">
                <small style="color: var(--text-muted); margin-top: 4px; display: block;">Leave empty to save as draft</small>
            </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                {{ $blog ? 'Update Blog' : 'Create Blog' }}
            </button>
            <a href="/admin/blogs" class="btn btn-edit">Cancel</a>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script type="importmap">
{
    "imports": {
        "ckeditor5": "https://cdn.ckeditor.com/ckeditor5/44.3.0/ckeditor5.js",
        "ckeditor5/": "https://cdn.ckeditor.com/ckeditor5/44.3.0/"
    }
}
</script>
<script type="module">
import {
    ClassicEditor,
    Essentials,
    Bold,
    Italic,
    Strikethrough,
    Underline,
    Heading,
    Paragraph,
    Link,
    List,
    BlockQuote,
    CodeBlock,
    Code,
    Table,
    TableToolbar,
    Indent,
    IndentBlock,
    MediaEmbed,
    HorizontalLine,
    Alignment,
    Image,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    SourceEditing,
    GeneralHtmlSupport
} from 'ckeditor5';

const editorContainer = document.getElementById('editor-container');
const hiddenTextarea = document.getElementById('content');

ClassicEditor
    .create(editorContainer, {
        plugins: [
            Essentials, Bold, Italic, Strikethrough, Underline,
            Heading, Paragraph, Link, List, BlockQuote,
            CodeBlock, Code, Table, TableToolbar,
            Indent, IndentBlock, MediaEmbed, HorizontalLine,
            Alignment, Image, ImageInsertViaUrl, ImageResize,
            ImageStyle, ImageToolbar, SourceEditing, GeneralHtmlSupport
        ],
        toolbar: {
            items: [
                'heading', '|',
                'bold', 'italic', 'underline', 'strikethrough', 'code', '|',
                'link', 'insertImage', 'blockQuote', 'codeBlock', '|',
                'bulletedList', 'numberedList', '|',
                'outdent', 'indent', 'alignment', '|',
                'insertTable', 'horizontalLine', 'mediaEmbed', '|',
                'undo', 'redo', '|',
                'sourceEditing'
            ],
            shouldNotGroupWhenFull: false
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
            ]
        },
        image: {
            toolbar: ['imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|', 'imageResize']
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        codeBlock: {
            languages: [
                { language: 'plaintext', label: 'Plain text' },
                { language: 'javascript', label: 'JavaScript' },
                { language: 'typescript', label: 'TypeScript' },
                { language: 'php', label: 'PHP' },
                { language: 'python', label: 'Python' },
                { language: 'html', label: 'HTML' },
                { language: 'css', label: 'CSS' },
                { language: 'bash', label: 'Bash' },
                { language: 'json', label: 'JSON' },
                { language: 'sql', label: 'SQL' }
            ]
        },
        htmlSupport: {
            allow: [
                { name: /.*/, attributes: true, classes: true, styles: true }
            ]
        },
        placeholder: 'Start writing your blog post...',
        initialData: hiddenTextarea.value || ''
    })
    .then(editor => {
        // Sync editor content to hidden textarea on every change
        editor.model.document.on('change:data', () => {
            hiddenTextarea.value = editor.getData();
        });

        // Also sync on form submit
        const form = hiddenTextarea.closest('form');
        if (form) {
            form.addEventListener('submit', () => {
                hiddenTextarea.value = editor.getData();
            });
        }

        window._blogEditor = editor;
    })
    .catch(error => {
        console.error('CKEditor init error:', error);
        // Fallback: show the textarea directly
        hiddenTextarea.style.display = 'block';
        hiddenTextarea.classList.add('form-control');
        hiddenTextarea.rows = 15;
        hiddenTextarea.placeholder = 'Write your blog content here (HTML supported)';
        editorContainer.style.display = 'none';
    });
</script>
@endpush
