<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                'title'        => 'The Future of Next.js Server Components',
                'category'     => 'Engineering',
                'read_time'    => '5 min read',
                'image'        => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
                'excerpt'      => 'Exploring how Server Components are reshaping the way we build React applications with Next.js.',
                'content'      => 'Server Components represent a paradigm shift in React development...',
                'author'       => 'David Chen',
                'published_at' => '2023-10-24 10:00:00',
            ],
            [
                'title'        => 'Designing for Accessibility: A Practical Guide',
                'category'     => 'Design',
                'read_time'    => '8 min read',
                'image'        => 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80',
                'excerpt'      => 'A hands-on guide to making your web applications truly accessible to everyone.',
                'content'      => 'Accessibility is not just a nice-to-have — it is a fundamental aspect of good design...',
                'author'       => 'Elena Rodriguez',
                'published_at' => '2023-10-12 10:00:00',
            ],
            [
                'title'        => 'Scaling Node.js Microservices to Millions of Requests',
                'category'     => 'DevOps',
                'read_time'    => '12 min read',
                'image'        => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
                'excerpt'      => 'Lessons learned from scaling a Node.js microservice architecture to handle millions of daily requests.',
                'content'      => 'When your service starts handling millions of requests per day, everything changes...',
                'author'       => 'Michael Chang',
                'published_at' => '2023-09-28 10:00:00',
            ],
            [
                'title'        => 'Why Startups Need a Solid Cyber Security Strategy Early',
                'category'     => 'Security',
                'read_time'    => '6 min read',
                'image'        => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
                'excerpt'      => 'Why investing in cybersecurity from day one can save your startup from catastrophic breaches.',
                'content'      => 'Many startups delay security measures until it is too late...',
                'author'       => 'Sarah Jenkins',
                'published_at' => '2023-09-15 10:00:00',
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::firstOrCreate(
                ['title' => $blog['title']],
                $blog
            );
        }
    }
}
