{{-- Image Upload Widget --}}
{{-- Usage: @include('admin.partials.upload', ['name' => 'image', 'value' => $model?->image]) --}}

@php $fieldName = $name ?? 'image'; @endphp
@php $currentValue = $value ?? ''; @endphp
@php $widgetId = 'upload_' . $fieldName . '_' . uniqid(); @endphp

<div class="upload-widget" id="{{ $widgetId }}">
    {{-- Hidden input that stores the final URL --}}
    <input type="hidden" name="{{ $fieldName }}" id="{{ $widgetId }}_input" value="{{ old($fieldName, $currentValue) }}">

    {{-- Drop zone (shown when no image) --}}
    <div class="upload-drop-zone" id="{{ $widgetId }}_dropzone"
         style="{{ old($fieldName, $currentValue) ? 'display:none' : '' }}">
        <div class="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        </div>
        <p>Drop an image here or <strong style="color:var(--accent);cursor:pointer;">browse</strong></p>
        <p class="upload-hint">JPG, PNG, GIF, WebP, SVG — Max 5 MB</p>
        <input type="file" id="{{ $widgetId }}_file" accept="image/*">
    </div>

    {{-- Preview (shown when image exists) --}}
    <div class="upload-preview upload-preview--compact" id="{{ $widgetId }}_preview"
         style="{{ old($fieldName, $currentValue) ? '' : 'display:none' }}">
        <img id="{{ $widgetId }}_img" src="{{ old($fieldName, $currentValue) }}" alt="Preview">
        <div class="upload-preview-actions">
            <button type="button" class="btn-change-img" title="Change image"
                    onclick="document.getElementById('{{ $widgetId }}_file2').click()">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button type="button" class="btn-remove-img" title="Remove image"
                    onclick="clearUpload_{{ str_replace('-', '_', $widgetId) }}()">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
        <input type="file" id="{{ $widgetId }}_file2" accept="image/*" style="display:none">
    </div>

    {{-- Progress bar --}}
    <div class="upload-progress" id="{{ $widgetId }}_progress">
        <div class="upload-progress-bar" id="{{ $widgetId }}_bar"></div>
    </div>

    {{-- Or paste URL --}}
    <div style="margin-top: 8px;">
        <input type="text" class="form-control" placeholder="Or paste image URL..."
               id="{{ $widgetId }}_url" value="{{ old($fieldName, $currentValue) }}"
               style="font-size: 12px; padding: 8px 12px; color: var(--text-muted);">
    </div>
</div>

<script>
(function() {
    const id = '{{ $widgetId }}';
    const safe = id.replace(/-/g, '_');
    const dropzone = document.getElementById(id + '_dropzone');
    const preview = document.getElementById(id + '_preview');
    const img = document.getElementById(id + '_img');
    const hidden = document.getElementById(id + '_input');
    const fileInput = document.getElementById(id + '_file');
    const fileInput2 = document.getElementById(id + '_file2');
    const progress = document.getElementById(id + '_progress');
    const bar = document.getElementById(id + '_bar');
    const urlInput = document.getElementById(id + '_url');

    function showPreview(url) {
        hidden.value = url;
        urlInput.value = url;
        img.src = url;
        dropzone.style.display = 'none';
        preview.style.display = 'block';
    }

    window['clearUpload_' + safe] = function() {
        hidden.value = '';
        urlInput.value = '';
        img.src = '';
        preview.style.display = 'none';
        dropzone.style.display = 'block';
    };

    function uploadFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be under 5 MB');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/admin/upload');
        xhr.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

        progress.classList.add('active');
        bar.style.width = '0%';

        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                bar.style.width = Math.round((e.loaded / e.total) * 100) + '%';
            }
        };

        xhr.onload = function() {
            progress.classList.remove('active');
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                showPreview(data.url);
            } else {
                alert('Upload failed. Please try again.');
            }
        };

        xhr.onerror = function() {
            progress.classList.remove('active');
            alert('Upload error. Please try again.');
        };

        xhr.send(formData);
    }

    // Click to browse
    dropzone.addEventListener('click', function() { fileInput.click(); });
    fileInput.addEventListener('change', function() { if (this.files[0]) uploadFile(this.files[0]); });
    fileInput2.addEventListener('change', function() { if (this.files[0]) uploadFile(this.files[0]); });

    // Drag & drop
    dropzone.addEventListener('dragover', function(e) { e.preventDefault(); this.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', function() { this.classList.remove('dragover'); });
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files[0]) uploadFile(e.dataTransfer.files[0]);
    });

    // URL paste
    urlInput.addEventListener('change', function() {
        const val = this.value.trim();
        if (val) {
            showPreview(val);
        } else {
            window['clearUpload_' + safe]();
        }
    });
})();
</script>
