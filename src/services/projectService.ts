import { Project } from "../types";
import { PROJECTS } from "../features/projects/project.data";

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(PROJECTS), 500);
    });
  },
  getProjectById: async (id: number): Promise<Project | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(PROJECTS.find((p) => p.id === id)), 200);
    });
  },
};
