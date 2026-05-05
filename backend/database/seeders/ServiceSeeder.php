<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title'       => 'Software Development',
                'description' => 'Custom enterprise software and scalable backend systems tailored to propel your business forward.',
                'icon'        => 'Code2',
                'features'    => ['Microservices & API architecture', 'Real-time data processing', 'Legacy system modernization'],
                'sort_order'  => 1,
            ],
            [
                'title'       => 'Mobile Apps',
                'description' => 'Native and cross-platform mobile applications designed for exceptional user experiences.',
                'icon'        => 'Smartphone',
                'features'    => ['iOS & Android native apps', 'Cross-platform with React Native', 'Offline-first architecture'],
                'sort_order'  => 2,
            ],
            [
                'title'       => 'UI/UX Design',
                'description' => 'Stunning, user-centric design systems that increase customer conversion and retention.',
                'icon'        => 'Paintbrush',
                'features'    => ['Design system creation', 'User research & testing', 'Conversion rate optimization'],
                'sort_order'  => 3,
            ],
            [
                'title'       => 'DevOps & Cloud',
                'description' => 'Automated CI/CD pipelines, seamless cloud migration, and 24/7 server monitoring.',
                'icon'        => 'Server',
                'features'    => ['AWS / GCP / Azure setup', 'Zero-downtime deployments', 'Auto-scaling infrastructure'],
                'sort_order'  => 4,
            ],
            [
                'title'       => 'Cyber Security',
                'description' => 'Advanced security audits and penetration testing to protect your valuable data.',
                'icon'        => 'Shield',
                'features'    => ['Penetration testing & audits', 'SOC 2 / HIPAA compliance', 'Incident response planning'],
                'sort_order'  => 5,
            ],
            [
                'title'       => 'Product Strategy',
                'description' => 'In-depth market research and MVP development planning for ambitious startups.',
                'icon'        => 'Layers',
                'features'    => ['Market & competitor analysis', 'MVP scoping & roadmapping', 'Growth strategy consulting'],
                'sort_order'  => 6,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
