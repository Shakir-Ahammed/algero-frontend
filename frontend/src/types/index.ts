import type { ComponentType, SVGProps } from "react";

export interface Project {
  id: number;
  title: string;
  slug?: string;
  category: string;
  image: string;
  tech: string[];
  desc: string;
  content?: string;
  images?: string[];
  color?: string;
  features?: string[];
  metrics?: { label: string; value: string }[];
  client?: string;
  url?: string;
  github_url?: string;
  demo_url?: string;
  featured?: boolean;
  created_at?: string;
}

export interface Service {
  title: string;
  desc: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  features?: string[];
}

export interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  image: string;
  read: string;
  excerpt?: string;
  content?: string;
  images?: string[];
  author?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
}
