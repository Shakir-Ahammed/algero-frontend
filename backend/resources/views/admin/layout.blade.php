<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin') — Algero</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --bg-primary: #030712;
            --bg-secondary: rgba(17, 24, 39, 0.7);
            --bg-card: rgba(17, 24, 39, 0.5);
            --bg-card-hover: rgba(31, 41, 55, 0.5);
            --border: rgba(255, 255, 255, 0.06);
            --text-primary: #f9fafb;
            --text-secondary: #9ca3af;
            --text-muted: #6b7280;
            --accent: #3b82f6;
            --accent-hover: #60a5fa;
            --accent-glow: rgba(59, 130, 246, 0.15);
            --success: #22c55e;
            --danger: #ef4444;
            --danger-hover: #f87171;
            --warning: #f59e0b;
            --radius: 12px;
            --radius-sm: 8px;
            --shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
            --transition: 0.3s ease;
        }

        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            line-height: 1.6;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Space Grotesk', sans-serif;
        }

        a { color: var(--accent); text-decoration: none; transition: color var(--transition); }
        a:hover { color: var(--accent-hover); }

        /* ─── Layout ─── */
        .admin-wrapper { display: flex; min-height: 100vh; }

        /* ─── Sidebar ─── */
        .sidebar {
            width: 260px;
            background: var(--bg-secondary);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border-right: 1px solid var(--border);
            padding: 0;
            position: fixed;
            top: 0; left: 0; bottom: 0;
            overflow-y: auto;
            z-index: 100;
        }
        .sidebar-brand {
            padding: 24px 24px 20px;
            border-bottom: 1px solid var(--border);
        }
        .sidebar-brand h1 {
            font-size: 20px;
            font-weight: 700;
            background: linear-gradient(135deg, #60a5fa, #22d3ee, #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
        }
        .sidebar-brand span {
            font-size: 11px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            display: block;
            margin-top: 4px;
        }
        .sidebar-nav { padding: 16px 12px; }
        .sidebar-nav a {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 14px;
            border-radius: var(--radius-sm);
            color: var(--text-secondary);
            font-size: 14px;
            font-weight: 500;
            transition: all var(--transition);
            margin-bottom: 2px;
        }
        .sidebar-nav a:hover, .sidebar-nav a.active {
            background: var(--accent-glow);
            color: var(--accent-hover);
        }
        .sidebar-nav a.active { border-left: 3px solid var(--accent); }
        .sidebar-nav .nav-icon { width: 20px; display: flex; justify-content: center; align-items: center; }
        .sidebar-nav .nav-icon svg { width: 18px; height: 18px; color: inherit; }
        .sidebar-section {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: var(--text-muted);
            padding: 20px 14px 8px;
            font-weight: 600;
        }
        .sidebar-footer {
            padding: 16px 12px;
            border-top: 1px solid var(--border);
            position: absolute;
            bottom: 0; left: 0; right: 0;
            background: transparent;
        }
        .sidebar-footer form button {
            width: 100%;
            padding: 10px;
            background: transparent;
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 13px;
            font-family: inherit;
            transition: all var(--transition);
        }
        .sidebar-footer form button:hover {
            border-color: var(--danger);
            color: var(--danger);
            background: rgba(239, 68, 68, 0.08);
        }

        /* ─── Main Content ─── */
        .main-content {
            flex: 1;
            margin-left: 260px;
            padding: 32px 40px;
            min-height: 100vh;
        }

        /* ─── Page Header ─── */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
        }
        .page-header h2 {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .page-header p { color: var(--text-secondary); font-size: 14px; margin-top: 4px; }

        /* ─── Cards / Stats ─── */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .stat-card {
            background: var(--bg-card);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 24px;
            transition: all var(--transition);
            box-shadow: var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .stat-card:hover { border-color: var(--accent); box-shadow: 0 0 20px var(--accent-glow); transform: translateY(-2px); }
        .stat-card .stat-icon { margin-bottom: 12px; color: var(--accent); }
        .stat-card .stat-icon svg { width: 28px; height: 28px; }
        .stat-card .stat-value { font-size: 32px; font-weight: 700; }
        .stat-card .stat-label { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }

        /* ─── Table ─── */
        .card {
            background: var(--bg-card);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            overflow: hidden;
            box-shadow: var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .card-header {
            padding: 18px 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .card-header h3 { font-size: 16px; font-weight: 600; }
        table { width: 100%; border-collapse: collapse; }
        th {
            text-align: left;
            padding: 12px 24px;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-muted);
            font-weight: 600;
            border-bottom: 1px solid var(--border);
            background: rgba(0,0,0,0.15);
        }
        td {
            padding: 14px 24px;
            font-size: 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            vertical-align: middle;
        }
        tr:hover td { background: rgba(99, 102, 241, 0.03); }
        td img.thumb { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; }

        /* ─── Buttons ─── */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 18px;
            border-radius: var(--radius-sm);
            font-size: 13px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            border: none;
            transition: all var(--transition);
            text-decoration: none;
        }
        .btn-primary { background: var(--accent); color: #fff; }
        .btn-primary:hover { background: var(--accent-hover); color: #fff; box-shadow: 0 0 16px var(--accent-glow); }
        .btn-sm { padding: 5px 12px; font-size: 12px; }
        .btn-edit { background: rgba(99, 102, 241, 0.12); color: var(--accent-hover); }
        .btn-edit:hover { background: rgba(99, 102, 241, 0.25); color: var(--accent-hover); }
        .btn-danger { background: rgba(239, 68, 68, 0.12); color: var(--danger); }
        .btn-danger:hover { background: rgba(239, 68, 68, 0.25); color: var(--danger-hover); }
        .btn-group { display: flex; gap: 6px; }

        /* ─── Forms ─── */
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 20px; }
        .form-group.full { grid-column: 1 / -1; }
        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-secondary);
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .form-control {
            width: 100%;
            padding: 10px 14px;
            background: rgba(3, 7, 18, 0.5);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
            font-size: 14px;
            font-family: inherit;
            transition: border-color var(--transition);
        }
        .form-control:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
        textarea.form-control { resize: vertical; min-height: 100px; }
        select.form-control { cursor: pointer; }
        .checkbox-row { display: flex; align-items: center; gap: 8px; }
        .checkbox-row input[type="checkbox"] { width: 18px; height: 18px; accent-color: var(--accent); }

        /* ─── Alerts ─── */
        .alert {
            padding: 12px 20px;
            border-radius: var(--radius-sm);
            margin-bottom: 20px;
            font-size: 14px;
            font-weight: 500;
        }
        .alert-success { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.25); color: var(--success); }
        .alert-danger { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); color: var(--danger); }

        /* ─── Badge ─── */
        .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .badge-active { background: rgba(34, 197, 94, 0.12); color: var(--success); }
        .badge-draft { background: rgba(245, 158, 11, 0.12); color: var(--warning); }
        .badge-inactive { background: rgba(100, 116, 139, 0.12); color: var(--text-muted); }

        /* ─── Pagination ─── */
        .pagination { display: flex; gap: 4px; justify-content: center; padding: 20px; }
        .pagination a, .pagination span {
            padding: 6px 14px;
            border-radius: var(--radius-sm);
            font-size: 13px;
            border: 1px solid var(--border);
            color: var(--text-secondary);
        }
        .pagination span.current { background: var(--accent); color: #fff; border-color: var(--accent); }
        .pagination a:hover { border-color: var(--accent); color: var(--accent-hover); }

        /* ─── Empty State ─── */
        .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
        .empty-state .icon { font-size: 48px; margin-bottom: 16px; }
        .empty-state p { font-size: 15px; margin-bottom: 20px; }

        /* ─── Image Upload Widget ─── */
        .upload-widget { position: relative; }
        .upload-drop-zone {
            border: 2px dashed var(--border);
            border-radius: var(--radius);
            padding: 32px 20px;
            text-align: center;
            cursor: pointer;
            transition: all var(--transition);
            background: rgba(3, 7, 18, 0.3);
        }
        .upload-drop-zone:hover,
        .upload-drop-zone.dragover {
            border-color: var(--accent);
            background: var(--accent-glow);
        }
        .upload-drop-zone .upload-icon {
            font-size: 36px;
            margin-bottom: 8px;
            color: var(--text-muted);
        }
        .upload-drop-zone p { color: var(--text-secondary); font-size: 13px; margin: 0; }
        .upload-drop-zone .upload-hint { color: var(--text-muted); font-size: 12px; margin-top: 6px; }
        .upload-drop-zone input[type="file"] { display: none; }

        .upload-preview {
            position: relative;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            overflow: hidden;
            background: rgba(3, 7, 18, 0.3);
        }
        .upload-preview img {
            width: 100%;
            max-height: 300px;
            object-fit: contain;
            display: block;
            background: rgba(0, 0, 0, 0.3);
            padding: 4px;
        }
        .upload-preview-actions {
            position: absolute;
            top: 8px;
            right: 8px;
            display: flex;
            gap: 6px;
        }
        .upload-preview-actions button {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--transition);
        }
        .btn-remove-img {
            background: rgba(239, 68, 68, 0.85);
            color: #fff;
            backdrop-filter: blur(8px);
        }
        .btn-remove-img:hover { background: var(--danger); }
        .btn-change-img {
            background: rgba(59, 130, 246, 0.85);
            color: #fff;
            backdrop-filter: blur(8px);
        }
        .btn-change-img:hover { background: var(--accent); }

        .upload-progress {
            margin-top: 8px;
            height: 4px;
            background: var(--border);
            border-radius: 2px;
            overflow: hidden;
            display: none;
        }
        .upload-progress.active { display: block; }
        .upload-progress-bar {
            height: 100%;
            background: var(--accent);
            border-radius: 2px;
            transition: width 0.3s ease;
            width: 0%;
        }
    </style>
</head>
<body>
    <div class="admin-wrapper">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-brand">
                <h1>Algero</h1>
                <span>Admin Panel</span>
            </div>
            <nav class="sidebar-nav">
                <div class="sidebar-section">Main</div>
                <a href="/admin" class="{{ request()->is('admin') && !request()->is('admin/*') ? 'active' : '' }}">
                    <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg></span> Dashboard
                </a>

                <div class="sidebar-section">Content</div>
                <a href="/admin/blogs" class="{{ request()->is('admin/blogs*') ? 'active' : '' }}">
                    <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg></span> Blogs
                </a>
                <a href="/admin/team" class="{{ request()->is('admin/team*') ? 'active' : '' }}">
                    <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span> Team Members
                </a>
                <a href="/admin/services" class="{{ request()->is('admin/services*') ? 'active' : '' }}">
                    <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></span> Services
                </a>

                <div class="sidebar-section">Marketing</div>
                <a href="/admin/leads" class="{{ request()->is('admin/leads*') ? 'active' : '' }}">
                    <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg></span> Contact Leads
                </a>
                <a href="/admin/subscribers" class="{{ request()->is('admin/subscribers*') ? 'active' : '' }}">
                    <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span> Subscribers
                </a>
            </nav>
            <div class="sidebar-footer">
                <form method="POST" action="/admin/logout">
                    @csrf
                    <button type="submit" style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg> Sign Out
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main -->
        <main class="main-content">
            @if(session('success'))
                <div class="alert alert-success">✅ {{ session('success') }}</div>
            @endif

            @if($errors->any())
                <div class="alert alert-danger">
                    @foreach($errors->all() as $error)
                        {{ $error }}<br>
                    @endforeach
                </div>
            @endif

            @yield('content')
        </main>
    </div>
</body>
</html>
