import {
  Code2,
  Smartphone,
  Paintbrush,
  Server,
  Shield,
  Layers,
} from "lucide-react";
import type { Service } from "../../types";

export const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Custom Software Development",
    desc: "Production-grade web applications, SaaS platforms, and enterprise systems. Architected for scale, security, and long-term maintainability.",
    features: [
      "Microservices & RESTful API architecture",
      "Real-time data processing & event-driven systems",
      "Legacy system modernization & migration",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile applications with Flutter and React Native. From MVP to App Store — we handle the full lifecycle.",
    features: [
      "iOS & Android from a single codebase",
      "Offline-first architecture with background sync",
      "Push notifications, payments & deep linking",
    ],
  },
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    desc: "User-centric interfaces designed to convert. We combine user research, design systems, and interaction design to build products people enjoy.",
    features: [
      "Design system creation in Figma",
      "User research & usability testing",
      "Conversion rate optimization (CRO)",
    ],
  },
  {
    icon: Server,
    title: "DevOps & Cloud Engineering",
    desc: "Automated CI/CD pipelines, Docker & Kubernetes containerization, and cloud infrastructure on AWS. We make deployments boring — in the best way.",
    features: [
      "AWS / GCP / DigitalOcean setup",
      "Zero-downtime blue/green deployments",
      "Auto-scaling & cost optimization",
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    desc: "Security audits, penetration testing, and compliance consulting. We find vulnerabilities before attackers do.",
    features: [
      "Web application penetration testing",
      "Security code review & vulnerability assessment",
      "SOC 2 / ISO 27001 compliance guidance",
    ],
  },
  {
    icon: Layers,
    title: "Product Strategy & MVP",
    desc: "Market research, MVP scoping, and product roadmapping for startups and growing businesses. Ship the right thing, faster.",
    features: [
      "Market & competitor analysis",
      "MVP scoping & feature prioritization",
      "Growth strategy consulting",
    ],
  },
];
