@extends('admin.layout')
@section('title', 'Subscribers')

@section('content')
<div class="page-header">
    <div>
        <h2>Subscribers</h2>
        <p>{{ $subscribers->total() }} total subscribers</p>
    </div>
</div>

<div class="card">
    <table>
        <thead>
            <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Subscribed</th>
                <th style="text-align:right">Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($subscribers as $sub)
            <tr>
                <td>{{ $sub->email }}</td>
                <td>
                    @if($sub->is_active)
                        <span class="badge badge-active">Active</span>
                    @else
                        <span class="badge badge-inactive">Inactive</span>
                    @endif
                </td>
                <td style="color: var(--text-muted); font-size: 13px;">{{ $sub->subscribed_at?->format('M d, Y H:i') }}</td>
                <td>
                    <div class="btn-group" style="justify-content: flex-end;">
                        <form method="POST" action="/admin/subscribers/{{ $sub->id }}" onsubmit="return confirm('Remove this subscriber?')">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger">Remove</button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="4">
                    <div class="empty-state">
                        <div class="icon">📧</div>
                        <p>No subscribers yet</p>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
    @if($subscribers->hasPages())
    <div class="pagination">
        @foreach($subscribers->getUrlRange(1, $subscribers->lastPage()) as $page => $url)
            @if($page == $subscribers->currentPage())
                <span class="current">{{ $page }}</span>
            @else
                <a href="{{ $url }}">{{ $page }}</a>
            @endif
        @endforeach
    </div>
    @endif
</div>
@endsection
