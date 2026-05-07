@extends('admin.layout')
@section('title', 'Team Members')

@section('content')
<div class="page-header">
    <div>
        <h2>Team Members</h2>
        <p>Manage your team — drag rows to reorder</p>
    </div>
    <a href="/admin/team/create" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        Add Member
    </a>
</div>

{{-- Save indicator --}}
<div id="reorder-toast" class="reorder-toast">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>Order saved</span>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th style="width:40px;"></th>
                <th>Member</th>
                <th>Role</th>
                <th>Status</th>
                <th>Order</th>
                <th style="text-align:right">Actions</th>
            </tr>
        </thead>
        <tbody id="sortable-team">
            @forelse($members as $member)
            <tr data-id="{{ $member->id }}">
                <td class="drag-handle" title="Drag to reorder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        @if($member->image)
                            <img src="{{ $member->image }}" alt="" class="thumb" style="border-radius: 50%;">
                        @else
                            <div style="width:40px;height:40px;border-radius:50%;background:var(--bg-card);display:flex;align-items:center;justify-content:center;color:var(--text-muted);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                        @endif
                        <div>
                            <strong>{{ $member->name }}</strong><br>
                            <small style="color: var(--text-muted);">{{ Str::limit($member->bio, 50) }}</small>
                        </div>
                    </div>
                </td>
                <td>{{ $member->role }}</td>
                <td>
                    @if($member->status === 'approved')
                        <span class="badge badge-active">Approved</span>
                    @elseif($member->status === 'rejected')
                        <span class="badge badge-inactive">Rejected</span>
                    @else
                        <span class="badge badge-draft">Pending</span>
                    @endif
                </td>
                <td><span class="order-number">{{ $member->sort_order }}</span></td>
                <td>
                    <div class="btn-group" style="justify-content: flex-end;">
                        <a href="/admin/team/{{ $member->id }}/edit" class="btn btn-sm btn-edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                            Edit
                        </a>
                        <form method="POST" action="/admin/team/{{ $member->id }}" onsubmit="return confirm('Remove this team member?')">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <p>No team members yet</p>
                        <a href="/admin/team/create" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                            Add First Member
                        </a>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

@push('styles')
<style>
    .drag-handle {
        cursor: grab;
        color: var(--text-muted);
        text-align: center;
        padding-left: 16px !important;
        padding-right: 4px !important;
        transition: color var(--transition);
        user-select: none;
    }
    .drag-handle:hover {
        color: var(--accent-hover);
    }
    .drag-handle:active {
        cursor: grabbing;
    }

    /* SortableJS ghost + chosen styles */
    tr.sortable-ghost {
        opacity: 0.15;
    }
    tr.sortable-chosen {
        background: rgba(59, 130, 246, 0.08) !important;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
    }
    tr.sortable-drag {
        background: var(--bg-secondary) !important;
        border: 1px solid var(--accent) !important;
        box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
    }
    tr.sortable-drag td {
        border-bottom: none !important;
    }

    /* Order number pill */
    .order-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border);
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        color: var(--text-secondary);
    }

    /* Reorder toast notification */
    .reorder-toast {
        position: fixed;
        bottom: 32px;
        right: 32px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: rgba(34, 197, 94, 0.15);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 12px;
        color: #4ade80;
        font-size: 13px;
        font-weight: 600;
        backdrop-filter: blur(16px);
        z-index: 9999;
        opacity: 0;
        transform: translateY(16px);
        transition: all 0.35s ease;
        pointer-events: none;
    }
    .reorder-toast.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .reorder-toast.error {
        background: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.3);
        color: #f87171;
    }
</style>
@endpush

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/Sortable.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.getElementById('sortable-team');
    if (!tbody || !tbody.children.length) return;

    const toast = document.getElementById('reorder-toast');

    function showToast(message, isError) {
        toast.querySelector('span').textContent = message;
        toast.classList.toggle('error', !!isError);
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 2200);
    }

    function updateOrderNumbers() {
        const rows = tbody.querySelectorAll('tr[data-id]');
        rows.forEach((row, idx) => {
            const pill = row.querySelector('.order-number');
            if (pill) pill.textContent = idx;
        });
    }

    Sortable.create(tbody, {
        handle: '.drag-handle',
        animation: 200,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        onEnd: function () {
            updateOrderNumbers();

            const rows = tbody.querySelectorAll('tr[data-id]');
            const order = Array.from(rows).map((row, idx) => ({
                id: parseInt(row.dataset.id),
                position: idx,
            }));

            fetch('/admin/team/reorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ order }),
            })
            .then(res => {
                if (!res.ok) throw new Error('Failed to save');
                return res.json();
            })
            .then(() => showToast('Order saved'))
            .catch(() => showToast('Failed to save order', true));
        },
    });
});
</script>
@endpush
@endsection
