@extends('admin.layout')
@section('title', 'Contact Leads')

@section('content')
<div class="page-header">
    <div>
        <h2>Contact Leads</h2>
        <p>{{ $leads->total() }} total leads from the contact form</p>
    </div>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                <th>Received</th>
                <th style="text-align:right">Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($leads as $lead)
            <tr>
                <td><strong>{{ $lead->full_name }}</strong></td>
                <td>{{ $lead->email }}</td>
                <td style="max-width: 250px;">
                    <small style="color: var(--text-secondary);">{{ Str::limit($lead->message, 60) }}</small>
                </td>
                <td>
                    @if($lead->status === 'new')
                        <span class="badge badge-draft">New</span>
                    @elseif($lead->status === 'contacted')
                        <span class="badge badge-active">Contacted</span>
                    @else
                        <span class="badge badge-inactive">Closed</span>
                    @endif
                </td>
                <td style="color: var(--text-muted); font-size: 13px; white-space: nowrap;">{{ $lead->created_at->format('M d, Y H:i') }}</td>
                <td>
                    <div class="btn-group" style="justify-content: flex-end;">
                        <a href="/admin/leads/{{ $lead->id }}" class="btn btn-sm btn-edit">View</a>
                        <form method="POST" action="/admin/leads/{{ $lead->id }}" onsubmit="return confirm('Delete this lead?')">
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
                        <div class="icon">📋</div>
                        <p>No contact leads yet</p>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
    @if($leads->hasPages())
    <div class="pagination">
        @foreach($leads->getUrlRange(1, $leads->lastPage()) as $page => $url)
            @if($page == $leads->currentPage())
                <span class="current">{{ $page }}</span>
            @else
                <a href="{{ $url }}">{{ $page }}</a>
            @endif
        @endforeach
    </div>
    @endif
</div>
@endsection
