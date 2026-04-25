import { featuredProjects } from "./projects";

export const caseStudyMenuSummaries = {
  tsuki:
    "A premium sushi restaurant identity shaped around moon symbolism, warm gold, and calm digital flow.",
  "atlas-case":
    "A case-study template built to make process, craft, and outcomes feel equally intentional.",
  "signal-duo":
    "A modular identity and portfolio system focused on dark surfaces, brand presence, and controlled interaction.",
};

export const caseStudyProjects = featuredProjects.map((project) => ({
  ...project,
  menuSummary: caseStudyMenuSummaries[project.id] ?? project.summary,
}));

export const getCaseStudyProjectById = (projectId) => (
  caseStudyProjects.find((project) => project.id === projectId) ?? caseStudyProjects[0]
);
