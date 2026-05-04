import type { ComponentType, SVGProps } from "react";

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tech?: string[];
  desc?: string;
  color?: string;
  features?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Service {
  title: string;
  desc?: string;
  description?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  id?: number;
  features?: string[];
}

export interface BlogPost {
  title: string;
  category: string;
  date: string;
  image: string;
  read?: string;
  readTime?: string;
  excerpt?: string;
  author?: string;
  id?: number;
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
  id?: number;
  text?: string;
  author?: string;
  role?: string;
  avatar?: string;
  name?: string;
  company?: string;
  content?: string;
  image?: string;
}
