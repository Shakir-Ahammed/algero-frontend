<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name'            => 'Sarah Jenkins',
                'role'            => 'CEO & Founder',
                'bio'             => '15+ years leading product teams at scale. Previously VP Engineering at a Y Combinator unicorn.',
                'image'           => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
                'social_linkedin' => '#',
                'social_twitter'  => '#',
                'social_github'   => '#',
                'sort_order'      => 1,
            ],
            [
                'name'            => 'David Chen',
                'role'            => 'Chief Technology Officer',
                'bio'             => 'Systems architect with a passion for distributed systems and developer experience.',
                'image'           => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
                'social_linkedin' => '#',
                'social_twitter'  => '#',
                'social_github'   => '#',
                'sort_order'      => 2,
            ],
            [
                'name'            => 'Elena Rodriguez',
                'role'            => 'Head of Design',
                'bio'             => 'Award-winning designer crafting interfaces that users love at first interaction.',
                'image'           => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
                'social_linkedin' => '#',
                'social_twitter'  => '#',
                'social_github'   => '#',
                'sort_order'      => 3,
            ],
            [
                'name'            => 'Michael Chang',
                'role'            => 'Lead DevOps Engineer',
                'bio'             => 'Cloud infrastructure expert. Built systems handling 100M+ requests per day.',
                'image'           => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
                'social_linkedin' => '#',
                'social_twitter'  => '#',
                'social_github'   => '#',
                'sort_order'      => 4,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::firstOrCreate(
                ['name' => $member['name']],
                $member
            );
        }
    }
}
