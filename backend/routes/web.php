<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/admin');
});

// ─── Admin Auth (guest only) ──────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AdminController::class, 'loginForm'])->name('login');
    Route::post('/admin/login', [AdminController::class, 'login']);
});

// ─── Admin Panel (auth required) ──────────────────────────
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
    Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    // Blogs
    Route::get('/blogs', [AdminController::class, 'blogs'])->name('admin.blogs');
    Route::get('/blogs/create', [AdminController::class, 'createBlog'])->name('admin.blogs.create');
    Route::post('/blogs', [AdminController::class, 'storeBlog']);
    Route::get('/blogs/{id}/edit', [AdminController::class, 'editBlog'])->name('admin.blogs.edit');
    Route::put('/blogs/{id}', [AdminController::class, 'updateBlog']);
    Route::delete('/blogs/{id}', [AdminController::class, 'deleteBlog']);

    // Team Members
    Route::get('/team', [AdminController::class, 'teamMembers'])->name('admin.team');
    Route::get('/team/create', [AdminController::class, 'createTeamMember'])->name('admin.team.create');
    Route::post('/team', [AdminController::class, 'storeTeamMember']);
    Route::get('/team/{id}/edit', [AdminController::class, 'editTeamMember'])->name('admin.team.edit');
    Route::put('/team/{id}', [AdminController::class, 'updateTeamMember']);
    Route::delete('/team/{id}', [AdminController::class, 'deleteTeamMember']);

    // Services
    Route::get('/services', [AdminController::class, 'services'])->name('admin.services');
    Route::get('/services/create', [AdminController::class, 'createService'])->name('admin.services.create');
    Route::post('/services', [AdminController::class, 'storeService']);
    Route::get('/services/{id}/edit', [AdminController::class, 'editService'])->name('admin.services.edit');
    Route::put('/services/{id}', [AdminController::class, 'updateService']);
    Route::delete('/services/{id}', [AdminController::class, 'deleteService']);

    // Projects
    Route::get('/projects', [AdminController::class, 'projects'])->name('admin.projects');
    Route::get('/projects/create', [AdminController::class, 'createProject'])->name('admin.projects.create');
    Route::post('/projects', [AdminController::class, 'storeProject']);
    Route::get('/projects/{id}/edit', [AdminController::class, 'editProject'])->name('admin.projects.edit');
    Route::put('/projects/{id}', [AdminController::class, 'updateProject']);
    Route::delete('/projects/{id}', [AdminController::class, 'deleteProject']);

    // Subscribers
    Route::get('/subscribers', [AdminController::class, 'subscribers'])->name('admin.subscribers');
    Route::delete('/subscribers/{id}', [AdminController::class, 'deleteSubscriber']);

    // Contact Leads
    Route::get('/leads', [AdminController::class, 'leads'])->name('admin.leads');
    Route::get('/leads/{id}', [AdminController::class, 'viewLead'])->name('admin.leads.view');
    Route::put('/leads/{id}/status', [AdminController::class, 'updateLeadStatus']);
    Route::delete('/leads/{id}', [AdminController::class, 'deleteLead']);

    // Image Upload
    Route::post('/upload', [AdminController::class, 'uploadImage'])->name('admin.upload');
});
