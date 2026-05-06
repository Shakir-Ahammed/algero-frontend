<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title'       => 'Fintech Dashboard',
                'category'    => 'Web App',
                'image'       => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                'tech'        => ['React', 'Node.js', 'PostgreSQL'],
                'description' => 'A high-performance financial analytics dashboard handling millions of transactions daily.',
                'client'      => 'FinCorp Inc.',
                'url'         => 'https://fintech-dashboard-demo.com',
                'is_featured' => true,
                'is_active'   => true,
                'sort_order'  => 1,
            ],
            [
                'title'       => 'HealthSync Mobile',
                'category'    => 'Mobile App',
                'image'       => 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80',
                'tech'        => ['React Native', 'Firebase'],
                'description' => 'HIPAA-compliant telemedicine app connecting patients with specialists instantly.',
                'client'      => 'MedConnect Health',
                'url'         => 'https://healthsync-app.com',
                'is_featured' => true,
                'is_active'   => true,
                'sort_order'  => 2,
            ],
            [
                'title'       => 'E-commerce Redesign',
                'category'    => 'UI/UX',
                'image'       => 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
                'tech'        => ['Figma', 'Prototyping'],
                'description' => 'Complete overhaul of a top-tier retail platform resulting in a 40% conversion increase.',
                'client'      => 'RetailMax',
                'url'         => 'https://retailmax-store.com',
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 3,
            ],
            [
                'title'       => 'Global Logistics API',
                'category'    => 'DevOps',
                'image'       => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
                'tech'        => ['AWS', 'Kubernetes', 'Go'],
                'description' => 'Microservices architecture for a shipping conglomerate to track global freight.',
                'client'      => 'ShipGlobal Ltd.',
                'url'         => 'https://logistics-api-docs.com',
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 4,
            ],
            [
                'title'       => 'AI Content Platform',
                'category'    => 'Web App',
                'image'       => 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
                'tech'        => ['Next.js', 'OpenAI', 'Tailwind'],
                'description' => 'Generative AI platform that helps marketing teams create content at scale.',
                'client'      => 'ContentAI Corp.',
                'url'         => 'https://ai-content-platform.com',
                'is_featured' => true,
                'is_active'   => true,
                'sort_order'  => 5,
            ],
            [
                'title'       => 'Crypto Wallet UI',
                'category'    => 'UI/UX',
                'image'       => 'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80',
                'tech'        => ['Framer', 'Design System'],
                'description' => 'A sleek, secure, and user-friendly interface for a next-gen cryptocurrency wallet.',
                'client'      => 'CryptoVault',
                'url'         => 'https://cryptovault-wallet.com',
                'is_featured' => false,
                'is_active'   => true,
                'sort_order'  => 6,
            ],
        ];

        foreach ($projects as $project) {
            Project::firstOrCreate(
                ['title' => $project['title']],
                $project
            );
        }
    }
}
