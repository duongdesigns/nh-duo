import { featuredProjects } from "./projects";

export const caseStudyMenuSummaries = {
  tsuki:
    "Eine Premium-Identität für ein Sushi-Restaurant, geprägt von Mondsymbolik, warmem Gold und einem ruhigen digitalen Ablauf.",
  "atlas-case":
    "Platzhaltertext für eine spätere Fallstudie mit kurzer Einordnung, Projektziel und visueller Richtung.",
  "signal-duo":
    "Platzhaltertext für ein späteres Portfolio-Projekt mit Fokus auf Struktur, Bildsprache und Ergebnis.",
};

export const caseStudyProjects = featuredProjects.map((project) => ({
  ...project,
  menuSummary: caseStudyMenuSummaries[project.id] ?? project.summary,
}));

export const getCaseStudyProjectById = (projectId) => (
  caseStudyProjects.find((project) => project.id === projectId) ?? caseStudyProjects[0]
);
