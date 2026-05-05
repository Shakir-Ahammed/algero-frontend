<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\ContactLead;
use App\Models\Service;
use App\Models\Subscriber;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            $request->session()->regenerate();
            return redirect()->intended('/admin');
        }

        return back()->withErrors([
            'email' => 'The provided credentials are incorrect.',
        ])->onlyInput('email');
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
        return view('admin.dashboard', [
            'blogCount'       => Blog::count(),
            'teamCount'       => TeamMember::count(),
            'serviceCount'    => Service::count(),
            'subscriberCount' => Subscriber::where('is_active', true)->count(),
            'leadCount'       => ContactLead::statusNew()->count(),
            'recentBlogs'     => Blog::orderByDesc('created_at')->take(5)->get(),
            'recentSubs'      => Subscriber::orderByDesc('subscribed_at')->take(5)->get(),
            'recentLeads'     => ContactLead::orderByDesc('created_at')->take(5)->get(),
        ]);
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
            'author'       => 'nullable|string|max:150',
            'read_time'    => 'nullable|string|max:50',
            'published_at' => 'nullable|date',
        ]);

        Blog::create($data);

        return redirect('/admin/blogs')->with('success', 'Blog created successfully.');
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
            'author'       => 'nullable|string|max:150',
            'read_time'    => 'nullable|string|max:50',
            'published_at' => 'nullable|date',
        ]);

        if ($data['title'] !== $blog->title) {
            $data['slug'] = Str::slug($data['title']);
        }

        $blog->update($data);

        return redirect('/admin/blogs')->with('success', 'Blog updated successfully.');
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

        TeamMember::create($data);

        return redirect('/admin/team')->with('success', 'Team member added.');
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

        $member->update($data);

        return redirect('/admin/team')->with('success', 'Team member updated.');
    }

    public function deleteTeamMember(int $id)
    {
        TeamMember::findOrFail($id)->delete();
        return redirect('/admin/team')->with('success', 'Team member deleted.');
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

    // ─── Helpers ──────────────────────────────────────────

    private function parseFeatures(?string $raw): array
    {
        if (empty($raw)) return [];
        return array_values(array_filter(array_map('trim', explode("\n", $raw))));
    }
}
