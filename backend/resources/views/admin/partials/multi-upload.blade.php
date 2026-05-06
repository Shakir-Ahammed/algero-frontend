{{-- Multi-Image Upload Widget --}}
{{-- Usage: @include('admin.partials.multi-upload', ['name' => 'images', 'value' => $model?->images]) --}}

@php $fieldName = $name ?? 'images'; @endphp
@php $currentValue = $value ?? []; @endphp
@php $widgetId = 'multi_upload_' . $fieldName . '_' . uniqid(); @endphp

<div class="multi-upload-widget" id="{{ $widgetId }}">
    {{-- Hidden textarea that stores newline-separated URLs --}}
    <textarea name="{{ $fieldName }}" id="{{ $widgetId }}_input" style="display:none;">{{ old($fieldName, is_array($currentValue) ? implode("\n", $currentValue) : $currentValue) }}</textarea>

    {{-- Gallery preview --}}
    <div class="gallery-grid" id="{{ $widgetId }}_gallery">
        {{-- JS will render items here --}}
    </div>

    {{-- Add image button / drop zone --}}
    <div class="gallery-add-zone" id="{{ $widgetId }}_dropzone">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <span>Add Images</span>
        <input type="file" id="{{ $widgetId }}_file" accept="image/*" multiple style="display:none;">
    </div>

    {{-- URL input --}}
    <div style="margin-top: 8px;">
        <div style="display:flex;gap:6px;">
            <input type="text" class="form-control" placeholder="Paste image URL and press Add..."
                   id="{{ $widgetId }}_url"
                   style="font-size: 12px; padding: 8px 12px; color: var(--text-muted); flex:1;">
            <button type="button" class="btn btn-sm btn-edit" id="{{ $widgetId }}_addurl">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Add
            </button>
        </div>
    </div>

    {{-- Progress bar --}}
    <div class="upload-progress" id="{{ $widgetId }}_progress">
        <div class="upload-progress-bar" id="{{ $widgetId }}_bar"></div>
    </div>
</div>

<style>
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 8px;
        margin-bottom: 8px;
    }
    .gallery-item {
        position: relative;
        aspect-ratio: 1;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--border);
        background: rgba(0,0,0,0.2);
    }
    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .gallery-item .gallery-remove {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: none;
        background: rgba(239, 68, 68, 0.85);
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.2s ease;
        backdrop-filter: blur(8px);
    }
    .gallery-item:hover .gallery-remove { opacity: 1; }
    .gallery-add-zone {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border: 2px dashed var(--border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--text-muted);
        font-size: 13px;
        background: rgba(3, 7, 18, 0.3);
    }
    .gallery-add-zone:hover,
    .gallery-add-zone.dragover {
        border-color: var(--accent);
        background: var(--accent-glow);
        color: var(--accent-hover);
    }
</style>

<script>
(function() {
    const id = '{{ $widgetId }}';
    const hidden = document.getElementById(id + '_input');
    const gallery = document.getElementById(id + '_gallery');
    const dropzone = document.getElementById(id + '_dropzone');
    const fileInput = document.getElementById(id + '_file');
    const urlInput = document.getElementById(id + '_url');
    const addUrlBtn = document.getElementById(id + '_addurl');
    const progress = document.getElementById(id + '_progress');
    const bar = document.getElementById(id + '_bar');

    let images = hidden.value.trim() ? hidden.value.trim().split('\n').filter(v => v.trim()) : [];

    function syncHidden() {
        hidden.value = images.join('\n');
    }

    function renderGallery() {
        gallery.innerHTML = '';
        images.forEach(function(url, idx) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = '<img src="' + url + '" alt="Image ' + (idx+1) + '">' +
                '<button type="button" class="gallery-remove" data-idx="' + idx + '">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
                '</button>';
            gallery.appendChild(item);
        });
        gallery.querySelectorAll('.gallery-remove').forEach(function(btn) {
            btn.addEventListener('click', function() {
                images.splice(parseInt(this.dataset.idx), 1);
                syncHidden();
                renderGallery();
            });
        });
    }

    function addImage(url) {
        images.push(url);
        syncHidden();
        renderGallery();
    }

    function uploadFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5 MB'); return; }
        const formData = new FormData();
        formData.append('image', file);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/admin/upload');
        xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
        progress.classList.add('active');
        bar.style.width = '0%';
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) bar.style.width = Math.round((e.loaded / e.total) * 100) + '%';
        };
        xhr.onload = function() {
            progress.classList.remove('active');
            if (xhr.status === 200) {
                addImage(JSON.parse(xhr.responseText).url);
            } else { alert('Upload failed.'); }
        };
        xhr.onerror = function() { progress.classList.remove('active'); alert('Upload error.'); };
        xhr.send(formData);
    }

    // Click to browse
    dropzone.addEventListener('click', function() { fileInput.click(); });
    fileInput.addEventListener('change', function() {
        Array.from(this.files).forEach(uploadFile);
        this.value = '';
    });

    // Drag & drop
    dropzone.addEventListener('dragover', function(e) { e.preventDefault(); this.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', function() { this.classList.remove('dragover'); });
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        Array.from(e.dataTransfer.files).forEach(uploadFile);
    });

    // URL add
    addUrlBtn.addEventListener('click', function() {
        const val = urlInput.value.trim();
        if (val) { addImage(val); urlInput.value = ''; }
    });
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); addUrlBtn.click(); }
    });

    renderGallery();
})();
</script>
