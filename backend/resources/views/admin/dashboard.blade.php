@extends('admin.layout')
@section('title', 'Dashboard')

@section('content')
<div class="page-header">
    <div>
        <h2>Dashboard</h2>
        <p>Welcome back, {{ Auth::user()->name }}!</p>
    </div>
</div>

<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-value">{{ $blogCount }}</div>
        <div class="stat-label">Blog Posts</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-value">{{ $teamCount }}</div>
        <div class="stat-label">Team Members</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">⚙️</div>
        <div class="stat-value">{{ $serviceCount }}</div>
        <div class="stat-label">Services</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">📧</div>
        <div class="stat-value">{{ $subscriberCount }}</div>
        <div class="stat-label">Subscribers</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">📋</div>
        <div class="stat-value">{{ $leadCount }}</div>
        <div class="stat-label">New Leads</div>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Recent Blogs -->
    <div class="card">
        <div class="card-header">
            <h3>Recent Blogs</h3>
            <a href="/admin/blogs" class="btn btn-sm btn-edit">View All</a>
        </div>
        <table>
            <tbody>
                @forelse($recentBlogs as $blog)
                <tr>
                    <td>
                        <strong>{{ Str::limit($blog->title, 35) }}</strong><br>
                        <small style="color: var(--text-muted);">{{ $blog->category }}</small>
                    </td>
                    <td style="text-align: right;">
                        @if($blog->published_at)
                            <span class="badge badge-active">Published</span>
                        @else
                            <span class="badge badge-draft">Draft</span>
                        @endif
                    </td>
                </tr>
                @empty
                <tr><td colspan="2" style="text-align:center; color: var(--text-muted); padding: 30px;">No blogs yet</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Recent Subscribers -->
    <div class="card">
        <div class="card-header">
            <h3>Recent Subscribers</h3>
            <a href="/admin/subscribers" class="btn btn-sm btn-edit">View All</a>
        </div>
        <table>
            <tbody>
                @forelse($recentSubs as $sub)
                <tr>
                    <td>{{ $sub->email }}</td>
                    <td style="text-align: right;">
                        <small style="color: var(--text-muted);">{{ $sub->subscribed_at?->diffForHumans() }}</small>
                    </td>
                </tr>
                @empty
                <tr><td colspan="2" style="text-align:center; color: var(--text-muted); padding: 30px;">No subscribers yet</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<!-- Recent Leads -->
<div class="card" style="margin-top: 24px;">
    <div class="card-header">
        <h3>Recent Contact Leads</h3>
        <a href="/admin/leads" class="btn btn-sm btn-edit">View All</a>
    </div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Received</th>
            </tr>
        </thead>
        <tbody>
            @forelse($recentLeads as $lead)
            <tr>
                <td><strong>{{ $lead->full_name }}</strong></td>
                <td>{{ $lead->email }}</td>
                <td>
                    @if($lead->status === 'new')
                        <span class="badge badge-draft">New</span>
                    @elseif($lead->status === 'contacted')
                        <span class="badge badge-active">Contacted</span>
                    @else
                        <span class="badge badge-inactive">Closed</span>
                    @endif
                </td>
                <td style="color: var(--text-muted); font-size: 13px;">{{ $lead->created_at->diffForHumans() }}</td>
            </tr>
            @empty
            <tr><td colspan="4" style="text-align:center; color: var(--text-muted); padding: 30px;">No contact leads yet</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
