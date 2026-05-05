<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('role', 150);
            $table->text('bio')->nullable();
            $table->string('image', 500)->nullable();
            $table->string('social_linkedin', 300)->nullable();
            $table->string('social_twitter', 300)->nullable();
            $table->string('social_github', 300)->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
