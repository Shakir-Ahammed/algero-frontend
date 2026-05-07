<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->longText('content')->nullable()->after('description');
            $table->string('github_url', 500)->nullable()->after('url');
            $table->string('demo_url', 500)->nullable()->after('github_url');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['content', 'github_url', 'demo_url']);
        });
    }
};
