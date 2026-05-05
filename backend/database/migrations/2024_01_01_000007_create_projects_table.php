<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category', 100);  // Web App, Mobile App, UI/UX, DevOps
            $table->string('image', 500)->nullable();
            $table->text('description')->nullable();
            $table->json('tech')->nullable();       // ["React", "Node.js", "PostgreSQL"]
            $table->string('client', 200)->nullable();
            $table->string('url', 500)->nullable();  // live project URL
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
