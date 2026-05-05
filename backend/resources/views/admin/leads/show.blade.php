@extends('admin.layout')
@section('title', 'Lead Details')

@section('content')
<div class="page-header">
    <div>
        <h2>Lead: {{ $lead->full_name }}</h2>
        <p>Received {{ $lead->created_at->format('M d, Y \a\t H:i') }}</p>
    </div>
    <a href="/admin/leads" class="btn btn-sm btn-edit">← Back to Leads</a>
</div>

<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
    <!-- Lead Details -->
    <div class="card" style="padding: 32px;">
        <div class="form-grid">
            <div class="form-group">
                <label>First Name</label>
                <div class="form-control" style="background: var(--bg-card);">{{ $lead->first_name }}</div>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <div class="form-control" style="background: var(--bg-card);">{{ $lead->last_name ?? '—' }}</div>
            </div>
            <div class="form-group full">
                <label>Email Address</label>
                <div class="form-control" style="background: var(--bg-card);">
                    <a href="mailto:{{ $lead->email }}">{{ $lead->email }}</a>
                </div>
            </div>
            <div class="form-group full">
                <label>Project Details / Message</label>
                <div class="form-control" style="background: var(--bg-card); min-height: 120px; white-space: pre-wrap;">{{ $lead->message ?? 'No message provided.' }}</div>
            </div>
        </div>
    </div>

    <!-- Status & Actions -->
    <div>
        <div class="card" style="padding: 24px; margin-bottom: 20px;">
            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 16px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px;">Status</h3>

            <div style="margin-bottom: 16px;">
                @if($lead->status === 'new')
                    <span class="badge badge-draft" style="font-size: 13px; padding: 6px 16px;">🆕 New</span>
                @elseif($lead->status === 'contacted')
                    <span class="badge badge-active" style="font-size: 13px; padding: 6px 16px;">✅ Contacted</span>
                @else
                    <span class="badge badge-inactive" style="font-size: 13px; padding: 6px 16px;">📁 Closed</span>
                @endif
            </div>

            <form method="POST" action="/admin/leads/{{ $lead->id }}/status">
                @csrf @method('PUT')
                <label style="display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">Change Status</label>
                <select name="status" class="form-control" style="margin-bottom: 12px;">
                    <option value="new" {{ $lead->status === 'new' ? 'selected' : '' }}>🆕 New</option>
                    <option value="contacted" {{ $lead->status === 'contacted' ? 'selected' : '' }}>✅ Contacted</option>
                    <option value="closed" {{ $lead->status === 'closed' ? 'selected' : '' }}>📁 Closed</option>
                </select>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Update Status</button>
            </form>
        </div>

        <div class="card" style="padding: 24px;">
            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 16px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px;">Actions</h3>
            <a href="mailto:{{ $lead->email }}" class="btn btn-edit" style="width: 100%; justify-content: center; margin-bottom: 8px;">📧 Send Email</a>
            <form method="POST" action="/admin/leads/{{ $lead->id }}" onsubmit="return confirm('Delete this lead permanently?')">
                @csrf @method('DELETE')
                <button type="submit" class="btn btn-danger" style="width: 100%; justify-content: center;">🗑️ Delete Lead</button>
            </form>
        </div>
    </div>
</div>
@endsection
