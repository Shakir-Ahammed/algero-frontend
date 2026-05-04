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
    title: "Software Development",
    desc: "Custom enterprise software and scalable backend systems tailored to propel your business forward.",
    features: [
      "Microservices & API architecture",
      "Real-time data processing",
      "Legacy system modernization",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications designed for exceptional user experiences.",
    features: [
      "iOS & Android native apps",
      "Cross-platform with React Native",
      "Offline-first architecture",
    ],
  },
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    desc: "Stunning, user-centric design systems that increase customer conversion and retention.",
    features: [
      "Design system creation",
      "User research & testing",
      "Conversion rate optimization",
    ],
  },
  {
    icon: Server,
    title: "DevOps & Cloud",
    desc: "Automated CI/CD pipelines, seamless cloud migration, and 24/7 server monitoring.",
    features: [
      "AWS / GCP / Azure setup",
      "Zero-downtime deployments",
      "Auto-scaling infrastructure",
    ],
  },
  {
    icon: Shield,
    title: "Cyber Security",
    desc: "Advanced security audits and penetration testing to protect your valuable data.",
    features: [
      "Penetration testing & audits",
      "SOC 2 / HIPAA compliance",
      "Incident response planning",
    ],
  },
  {
    icon: Layers,
    title: "Product Strategy",
    desc: "In-depth market research and MVP development planning for ambitious startups.",
    features: [
      "Market & competitor analysis",
      "MVP scoping & roadmapping",
      "Growth strategy consulting",
    ],
  },
];
