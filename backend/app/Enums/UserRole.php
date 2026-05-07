<?php

namespace App\Enums;

/**
 * Allowed roles for admin users.
 *
 * Using a backed enum prevents typos like "superadmin" vs "super_admin".
 * Laravel will automatically cast this on the User model.
 */
enum UserRole: string
{
    case SuperAdmin = 'super_admin';
    case Admin      = 'admin';

    /**
     * Human-readable label for display in UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::SuperAdmin => 'Super Admin',
            self::Admin      => 'Admin',
        };
    }
}
