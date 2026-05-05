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
        <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg></div>
        <div class="stat-value">{{ $blogCount }}</div>
        <div class="stat-label">Blog Posts</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
        <div class="stat-value">{{ $teamCount }}</div>
        <div class="stat-label">Team Members</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></div>
        <div class="stat-value">{{ $serviceCount }}</div>
        <div class="stat-label">Services</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
        <div class="stat-value">{{ $projectCount }}</div>
        <div class="stat-label">Projects</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
        <div class="stat-value">{{ $subscriberCount }}</div>
        <div class="stat-label">Subscribers</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg></div>
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
