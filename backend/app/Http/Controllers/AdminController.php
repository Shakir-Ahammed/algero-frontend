<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Blog;
use App\Models\ContactLead;
use App\Models\Project;
use App\Models\Service;
use App\Models\Subscriber;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    // ─── Auth ─────────────────────────────────────────────

    public function loginForm()
    {
        if (Auth::check()) {
            return redirect('/admin');
        }
        return view('admin.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            // Check if the user is active
            if (!Auth::user()->is_active) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return back()->withErrors([
                    'email' => 'Your account is not yet activated. Please wait for Super Admin approval.',
                ])->onlyInput('email');
            }

            $request->session()->regenerate();
            return redirect()->intended('/admin');
        }

        return back()->withErrors([
            'email' => 'The provided credentials are incorrect.',
        ])->onlyInput('email');
    }

    public function registerForm()
    {
        if (Auth::check()) {
            return redirect('/admin');
        }
        return view('admin.register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create([
            'name'      => $data['name'],
            'email'     => $data['email'],
            'password'  => Hash::make($data['password']),
            'role'      => UserRole::Admin,
            'is_active' => false,
        ]);

        return redirect('/admin/login')
            ->with('success', 'Registration successful! Your account is pending activation by the Super Admin.');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/admin/login');
    }

    // ─── Dashboard ────────────────────────────────────────

    public function dashboard()
    {
        $data = [
            'blogCount'       => Blog::count(),
            'teamCount'       => TeamMember::count(),
            'serviceCount'    => Service::count(),
            'projectCount'    => Project::count(),
            'subscriberCount' => Subscriber::where('is_active', true)->count(),
            'leadCount'       => ContactLead::statusNew()->count(),
            'recentBlogs'     => Blog::orderByDesc('created_at')->take(5)->get(),
            'recentSubs'      => Subscriber::orderByDesc('subscribed_at')->take(5)->get(),
            'recentLeads'     => ContactLead::orderByDesc('created_at')->take(5)->get(),
        ];

        // Super Admin gets pending counts for the approval dashboard
        if (Auth::user()->isSuperAdmin()) {
            $data['pendingUsers']    = User::inactive()->where('role', '!=', UserRole::SuperAdmin)->count();
            $data['pendingTeam']     = TeamMember::pending()->count();
            $data['pendingProjects'] = Project::pending()->count();
            $data['pendingBlogs']    = Blog::pending()->count();
        }

        return view('admin.dashboard', $data);
    }

    // ─── Blogs ────────────────────────────────────────────

    public function blogs()
    {
        return view('admin.blogs.index', [
            'blogs' => Blog::orderByDesc('created_at')->paginate(10),
        ]);
    }

    public function createBlog()
    {
        return view('admin.blogs.form', ['blog' => null]);
    }

    public function storeBlog(Request $request)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'required|string|max:100',
            'excerpt'      => 'nullable|string',
            'content'      => 'nullable|string',
            'image'        => 'nullable|string|max:500',
            'images'       => 'nullable|string',
            'author'       => 'nullable|string|max:150',
            'read_time'    => 'nullable|string|max:50',
            'published_at' => 'nullable|date',
        ]);

        $data['images'] = $this->parseImages($data['images'] ?? '');

        // Super Admins can auto-approve; regular admins get pending status
        $data['status'] = Auth::user()->isSuperAdmin() ? 'approved' : 'pending';

        Blog::create($data);

        $message = Auth::user()->isSuperAdmin()
            ? 'Blog created and approved.'
            : 'Blog created. It will be visible after Super Admin approval.';

        return redirect('/admin/blogs')->with('success', $message);
    }

    public function editBlog(int $id)
    {
        return view('admin.blogs.form', [
            'blog' => Blog::findOrFail($id),
        ]);
    }

    public function updateBlog(Request $request, int $id)
    {
        $blog = Blog::findOrFail($id);

        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'required|string|max:100',
            'excerpt'      => 'nullable|string',
            'content'      => 'nullable|string',
            'image'        => 'nullable|string|max:500',
            'images'       => 'nullable|string',
            'author'       => 'nullable|string|max:150',
            'read_time'    => 'nullable|string|max:50',
            'published_at' => 'nullable|date',
        ]);

        $data['images'] = $this->parseImages($data['images'] ?? '');

        if ($data['title'] !== $blog->title) {
            $data['slug'] = Str::slug($data['title']);
        }

        // Regular admins editing content resets status to pending
        if (!Auth::user()->isSuperAdmin()) {
            $data['status'] = 'pending';
        }

        $blog->update($data);

        $message = Auth::user()->isSuperAdmin()
            ? 'Blog updated successfully.'
            : 'Blog updated. It will be reviewed by Super Admin.';

        return redirect('/admin/blogs')->with('success', $message);
    }

    public function deleteBlog(int $id)
    {
        Blog::findOrFail($id)->delete();
        return redirect('/admin/blogs')->with('success', 'Blog deleted.');
    }

    // ─── Team Members ─────────────────────────────────────

    public function teamMembers()
    {
        return view('admin.team.index', [
            'members' => TeamMember::orderBy('sort_order')->get(),
        ]);
    }

    public function createTeamMember()
    {
        return view('admin.team.form', ['member' => null]);
    }

    public function storeTeamMember(Request $request)
    {
        $data = $request->validate([
            'name'            => 'required|string|max:150',
            'role'            => 'required|string|max:150',
            'bio'             => 'nullable|string',
            'image'           => 'nullable|string|max:500',
            'social_linkedin' => 'nullable|string|max:300',
            'social_twitter'  => 'nullable|string|max:300',
            'social_github'   => 'nullable|string|max:300',
            'sort_order'      => 'nullable|integer',
        ]);

        $data['status'] = Auth::user()->isSuperAdmin() ? 'approved' : 'pending';

        TeamMember::create($data);

        $message = Auth::user()->isSuperAdmin()
            ? 'Team member added and approved.'
            : 'Team member added. It will be visible after Super Admin approval.';

        return redirect('/admin/team')->with('success', $message);
    }

    public function editTeamMember(int $id)
    {
        return view('admin.team.form', [
            'member' => TeamMember::findOrFail($id),
        ]);
    }

    public function updateTeamMember(Request $request, int $id)
    {
        $member = TeamMember::findOrFail($id);

        $data = $request->validate([
            'name'            => 'required|string|max:150',
            'role'            => 'required|string|max:150',
            'bio'             => 'nullable|string',
            'image'           => 'nullable|string|max:500',
            'social_linkedin' => 'nullable|string|max:300',
            'social_twitter'  => 'nullable|string|max:300',
            'social_github'   => 'nullable|string|max:300',
            'sort_order'      => 'nullable|integer',
        ]);

        if (!Auth::user()->isSuperAdmin()) {
            $data['status'] = 'pending';
        }

        $member->update($data);

        $message = Auth::user()->isSuperAdmin()
            ? 'Team member updated.'
            : 'Team member updated. It will be reviewed by Super Admin.';

        return redirect('/admin/team')->with('success', $message);
    }

    public function deleteTeamMember(int $id)
    {
        TeamMember::findOrFail($id)->delete();
        return redirect('/admin/team')->with('success', 'Team member deleted.');
    }

    public function reorderTeamMembers(Request $request)
    {
        $request->validate([
            'order'            => 'required|array',
            'order.*.id'       => 'required|integer|exists:team_members,id',
            'order.*.position' => 'required|integer|min:0',
        ]);

        foreach ($request->input('order') as $item) {
            TeamMember::where('id', $item['id'])->update(['sort_order' => $item['position']]);
        }

        return response()->json(['message' => 'Order updated successfully.']);
    }

    // ─── Services ─────────────────────────────────────────

    public function services()
    {
        return view('admin.services.index', [
            'services' => Service::orderBy('sort_order')->get(),
        ]);
    }

    public function createService()
    {
        return view('admin.services.form', ['service' => null]);
    }

    public function storeService(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:200',
            'description' => 'required|string',
            'icon'        => 'nullable|string|max:100',
            'features'    => 'nullable|string',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable',
        ]);

        $data['features'] = $this->parseFeatures($data['features'] ?? '');
        $data['is_active'] = $request->has('is_active');

        Service::create($data);

        return redirect('/admin/services')->with('success', 'Service created.');
    }

    public function editService(int $id)
    {
        return view('admin.services.form', [
            'service' => Service::findOrFail($id),
        ]);
    }

    public function updateService(Request $request, int $id)
    {
        $service = Service::findOrFail($id);

        $data = $request->validate([
            'title'       => 'required|string|max:200',
            'description' => 'required|string',
            'icon'        => 'nullable|string|max:100',
            'features'    => 'nullable|string',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable',
        ]);

        if ($data['title'] !== $service->title) {
            $data['slug'] = Str::slug($data['title']);
        }

        $data['features'] = $this->parseFeatures($data['features'] ?? '');
        $data['is_active'] = $request->has('is_active');

        $service->update($data);

        return redirect('/admin/services')->with('success', 'Service updated.');
    }

    public function deleteService(int $id)
    {
        Service::findOrFail($id)->delete();
        return redirect('/admin/services')->with('success', 'Service deleted.');
    }

    // ─── Projects ─────────────────────────────────────────

    public function projects()
    {
        return view('admin.projects.index', [
            'projects' => Project::orderBy('sort_order')->orderByDesc('created_at')->get(),
        ]);
    }

    public function createProject()
    {
        return view('admin.projects.form', ['project' => null]);
    }

    public function storeProject(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'content'     => 'nullable|string',
            'image'       => 'nullable|string|max:500',
            'images'      => 'nullable|string',
            'tech'        => 'nullable|string',
            'client'      => 'nullable|string|max:200',
            'url'         => 'nullable|string|max:500',
            'github_url'  => 'nullable|string|max:500',
            'demo_url'    => 'nullable|string|max:500',
            'is_featured' => 'nullable',
            'is_active'   => 'nullable',
            'sort_order'  => 'nullable|integer',
        ]);

        $data['tech'] = $this->parseTech($data['tech'] ?? '');
        $data['images'] = $this->parseImages($data['images'] ?? '');
        $data['is_featured'] = $request->has('is_featured');
        $data['is_active'] = $request->has('is_active');
        $data['status'] = Auth::user()->isSuperAdmin() ? 'approved' : 'pending';

        Project::create($data);

        $message = Auth::user()->isSuperAdmin()
            ? 'Project created and approved.'
            : 'Project created. It will be visible after Super Admin approval.';

        return redirect('/admin/projects')->with('success', $message);
    }

    public function editProject(int $id)
    {
        return view('admin.projects.form', [
            'project' => Project::findOrFail($id),
        ]);
    }

    public function updateProject(Request $request, int $id)
    {
        $project = Project::findOrFail($id);

        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'content'     => 'nullable|string',
            'image'       => 'nullable|string|max:500',
            'images'      => 'nullable|string',
            'tech'        => 'nullable|string',
            'client'      => 'nullable|string|max:200',
            'url'         => 'nullable|string|max:500',
            'github_url'  => 'nullable|string|max:500',
            'demo_url'    => 'nullable|string|max:500',
            'is_featured' => 'nullable',
            'is_active'   => 'nullable',
            'sort_order'  => 'nullable|integer',
        ]);

        if ($data['title'] !== $project->title) {
            $data['slug'] = Str::slug($data['title']);
        }

        $data['tech'] = $this->parseTech($data['tech'] ?? '');
        $data['images'] = $this->parseImages($data['images'] ?? '');
        $data['is_featured'] = $request->has('is_featured');
        $data['is_active'] = $request->has('is_active');

        if (!Auth::user()->isSuperAdmin()) {
            $data['status'] = 'pending';
        }

        $project->update($data);

        $message = Auth::user()->isSuperAdmin()
            ? 'Project updated.'
            : 'Project updated. It will be reviewed by Super Admin.';

        return redirect('/admin/projects')->with('success', $message);
    }

    public function deleteProject(int $id)
    {
        Project::findOrFail($id)->delete();
        return redirect('/admin/projects')->with('success', 'Project deleted.');
    }

    // ─── Subscribers ──────────────────────────────────────

    public function subscribers()
    {
        return view('admin.subscribers.index', [
            'subscribers' => Subscriber::orderByDesc('subscribed_at')->paginate(20),
        ]);
    }

    public function deleteSubscriber(int $id)
    {
        Subscriber::findOrFail($id)->delete();
        return redirect('/admin/subscribers')->with('success', 'Subscriber removed.');
    }

    // ─── Contact Leads ─────────────────────────────────────

    public function leads()
    {
        return view('admin.leads.index', [
            'leads' => ContactLead::orderByDesc('created_at')->paginate(20),
        ]);
    }

    public function viewLead(int $id)
    {
        return view('admin.leads.show', [
            'lead' => ContactLead::findOrFail($id),
        ]);
    }

    public function updateLeadStatus(Request $request, int $id)
    {
        $lead = ContactLead::findOrFail($id);
        $lead->update(['status' => $request->input('status')]);
        return redirect('/admin/leads')->with('success', 'Lead status updated.');
    }

    public function deleteLead(int $id)
    {
        ContactLead::findOrFail($id)->delete();
        return redirect('/admin/leads')->with('success', 'Lead deleted.');
    }

    // ─── Super Admin: Approval Management ──────────────────

    public function approvals()
    {
        return view('admin.approvals.index', [
            'pendingUsers'    => User::inactive()->where('role', '!=', UserRole::SuperAdmin)->orderByDesc('created_at')->get(),
            'pendingTeam'     => TeamMember::pending()->orderByDesc('created_at')->get(),
            'pendingProjects' => Project::pending()->orderByDesc('created_at')->get(),
            'pendingBlogs'    => Blog::pending()->orderByDesc('created_at')->get(),
        ]);
    }

    public function approveContent(Request $request, string $type, int $id)
    {
        $model = $this->resolveContentModel($type, $id);
        $model->update(['status' => 'approved']);

        return redirect('/admin/approvals')->with('success', ucfirst($type) . ' approved successfully.');
    }

    public function rejectContent(Request $request, string $type, int $id)
    {
        $model = $this->resolveContentModel($type, $id);
        $model->update(['status' => 'rejected']);

        return redirect('/admin/approvals')->with('success', ucfirst($type) . ' rejected.');
    }

    // ─── Super Admin: User Management ──────────────────────

    public function users()
    {
        return view('admin.users.index', [
            'users' => User::where('role', '!=', UserRole::SuperAdmin)->orderByDesc('created_at')->paginate(20),
        ]);
    }

    public function activateUser(int $id)
    {
        $user = User::findOrFail($id);
        $user->update(['is_active' => true]);
        return redirect()->back()->with('success', 'User "' . $user->name . '" has been activated.');
    }

    public function deactivateUser(int $id)
    {
        $user = User::findOrFail($id);
        if ($user->isSuperAdmin()) {
            return redirect()->back()->withErrors(['Cannot deactivate a Super Admin.']);
        }
        $user->update(['is_active' => false]);
        return redirect()->back()->with('success', 'User "' . $user->name . '" has been deactivated.');
    }

    // ─── Image Upload ──────────────────────────────────────

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png,gif,webp,svg|max:5120',
        ]);

        $path = $request->file('image')->store('uploads', 'public');

        $url = asset('storage/' . $path);

        return response()->json([
            'url'  => $url,
            'path' => $path,
        ]);
    }

    // ─── Helpers ──────────────────────────────────────────

    private function resolveContentModel(string $type, int $id)
    {
        return match ($type) {
            'blog'    => Blog::findOrFail($id),
            'team'    => TeamMember::findOrFail($id),
            'project' => Project::findOrFail($id),
            default   => abort(404, 'Unknown content type.'),
        };
    }

    private function parseFeatures(?string $raw): array
    {
        if (empty($raw)) return [];
        return array_values(array_filter(array_map('trim', explode("\n", $raw))));
    }

    private function parseTech(?string $raw): array
    {
        if (empty($raw)) return [];
        return array_values(array_filter(array_map('trim', explode(",", $raw))));
    }

    private function parseImages(?string $raw): array
    {
        if (empty($raw)) return [];
        return array_values(array_filter(array_map('trim', explode("\n", $raw))));
    }
}
