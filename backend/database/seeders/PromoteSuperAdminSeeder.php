<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class PromoteSuperAdminSeeder extends Seeder
{
    /**
     * Promote the first user to super_admin and mark as active.
     * Also mark all existing content as approved for backward compatibility.
     */
    public function run(): void
    {
        // Promote the first user (or one by email) to super_admin
        $user = User::first();

        if ($user) {
            $user->update([
                'role'      => UserRole::SuperAdmin,
                'is_active' => true,
            ]);

            $this->command->info("✓ User \"{$user->name}\" ({$user->email}) promoted to Super Admin.");
        } else {
            $this->command->warn('No users found. Create a user first.');
        }

        // Mark all existing content as approved (backward compat)
        $blogCount    = \App\Models\Blog::where('status', 'pending')->update(['status' => 'approved']);
        $teamCount    = \App\Models\TeamMember::where('status', 'pending')->update(['status' => 'approved']);
        $projectCount = \App\Models\Project::where('status', 'pending')->update(['status' => 'approved']);

        $this->command->info("✓ Approved {$blogCount} blogs, {$teamCount} team members, {$projectCount} projects.");

        // Mark all existing users as active
        $userCount = User::where('is_active', false)->update(['is_active' => true]);
        $this->command->info("✓ Activated {$userCount} existing users.");
    }
}
