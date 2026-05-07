<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // ── Users: add role & active status ──
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 20)->default('admin')->after('remember_token');
            $table->boolean('is_active')->default(false)->after('role');
        });

        // ── Team Members: add approval status ──
        Schema::table('team_members', function (Blueprint $table) {
            $table->string('status', 20)->default('pending')->after('sort_order');
        });

        // ── Blogs: add approval status ──
        Schema::table('blogs', function (Blueprint $table) {
            $table->string('status', 20)->default('pending')->after('published_at');
        });

        // ── Projects: add approval status ──
        Schema::table('projects', function (Blueprint $table) {
            $table->string('status', 20)->default('pending')->after('sort_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_active']);
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
