<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Convert users.role from a free-text string to a database-level
     * CHECK constraint so only 'super_admin' and 'admin' are allowed.
     *
     * PostgreSQL doesn't have a native ENUM type like MySQL, so we use
     * a CHECK constraint which achieves the same safety.
     */
    public function up(): void
    {
        // Ensure any bad data is fixed before adding the constraint
        DB::statement("UPDATE users SET role = 'admin' WHERE role NOT IN ('super_admin', 'admin')");

        // Add CHECK constraint (PostgreSQL)
        DB::statement("ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('super_admin', 'admin'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check");
    }
};
