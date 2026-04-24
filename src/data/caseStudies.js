import { caseStudyImages, featuredPreviewImages, projectImages } from "./imagery";
import { featuredProjects } from "./projects";

const caseStudiesById = {
  "nord-form": {
    menuSummary:
      "A brand-led studio website shaped around atmosphere, hierarchy, and deliberate pacing.",
    sections: {
      Hero: {
        kicker: "Case Study Hero",
        heading: "Nord Form builds its presence through narrative pacing, restrained motion, and a system-first interface.",
        text:
          "The page introduces the studio through one dominant frame and a concise premise. Every transition is there to support orientation rather than spectacle.",
        layout: "hero",
        image: projectImages["nord-form"],
      },
      Overview: {
        kicker: "Project Overview",
        heading: "Create a digital presence that feels cinematic without losing speed, clarity, or editorial control.",
        text:
          "The brief centered on translating a design-led practice into a site system: sharper narrative structure, clearer service positioning, and motion that feels premium but never decorative.",
        layout: "overview",
        details: [
          ["Role", "Creative Developer / Brand Designer"],
          ["Timeline", "8 weeks"],
          ["Scope", "Brand-led website, content rhythm, case-study system"],
          ["Tools", "React, GSAP, Motion, Figma"],
        ],
      },
      Discovery: {
        kicker: "Exploration / Discovery",
        heading: "The exploration phase focused on editorial reference, pacing, and how much motion the brand could carry without feeling overworked.",
        text:
          "Early studies tested contrast, cropping, and line length. The direction that held up best paired dense dark surfaces with calmer spacing and fewer, more deliberate accents.",
        layout: "media",
        media: [
          featuredPreviewImages[0],
          caseStudyImages.media[0],
          caseStudyImages.grid[1],
        ],
      },
      Process: {
        kicker: "Design Process",
        heading: "System decisions came first: spacing, image treatment, headline rhythm, and a clearer path between overview and proof.",
        text:
          "Rather than adding more modules, the process refined the transitions between them. The final structure uses fewer shifts in tone and more consistent visual pressure from section to section.",
        layout: "media",
        media: [
          caseStudyImages.grid[0],
          caseStudyImages.gallery[1],
          caseStudyImages.media[2],
        ],
      },
      "Final Design": {
        kicker: "Final Design",
        heading: "The final design presents the studio as composed and exacting, with image-first sections supported by measured interaction states.",
        text:
          "Large media, tighter copy edits, and shared motion timings create a consistent reading rhythm. The result feels premium without drifting into noise.",
        layout: "gallery",
        gallery: [
          caseStudyImages.hero[0],
          caseStudyImages.media[0],
          caseStudyImages.grid[0],
        ],
      },
      Impact: {
        kicker: "Impact",
        heading: "The outcome is a more legible and reusable web system for presenting brand work with stronger narrative control.",
        text:
          "The structure now supports both a studio homepage and future case studies without redesigning the whole experience each time a new project is added.",
        layout: "impact",
        items: [
          "Clearer project orientation from the opening screen",
          "Reusable section rhythm for future launches and case studies",
          "More premium tone without increasing visual clutter",
        ],
      },
      Learnings: {
        kicker: "Learnings",
        heading: "Restraint became the main design tool: every addition had to earn its place in the reading flow.",
        text:
          "The project reinforced that premium digital work depends less on volume and more on how consistently typography, motion, and spacing agree with one another.",
        layout: "text",
        notes: [
          "Motion works best when it clarifies sequence rather than drawing attention to itself.",
          "Image pacing matters as much as image quality when the layout is editorial.",
        ],
      },
    },
  },
  "atlas-case": {
    menuSummary:
      "A case-study template built to make process, craft, and outcomes feel equally intentional.",
    sections: {
      Hero: {
        kicker: "Case Study Hero",
        heading: "Atlas Case turns process documentation into a visual product instead of a secondary archive.",
        text:
          "The page is structured to let early thinking, intermediate decisions, and final outcomes share the same level of care. It reads like a designed narrative, not a dump of artifacts.",
        layout: "hero",
        image: projectImages["atlas-case"],
      },
      Overview: {
        kicker: "Project Overview",
        heading: "Develop a flexible editorial case-study format that could present visual work with more authorship and less friction.",
        text:
          "The goal was a reusable storytelling format: scannable enough for quick review, but rich enough to communicate craft, references, and decision-making.",
        layout: "overview",
        details: [
          ["Role", "Art Direction / Case-Study Design"],
          ["Timeline", "6 weeks"],
          ["Scope", "Template system, visual hierarchy, editorial pacing"],
          ["Tools", "Figma, Adobe CC, Motion studies"],
        ],
      },
      Discovery: {
        kicker: "Exploration / Discovery",
        heading: "Reference gathering centered on editorial spreads, design books, and presentation systems that let process feel curated rather than overexplained.",
        text:
          "The strongest references gave equal weight to artifacts and narration. That balance shaped how captions, images, and sectional transitions were composed.",
        layout: "media",
        media: [
          featuredPreviewImages[2],
          featuredPreviewImages[1],
          caseStudyImages.media[1],
        ],
      },
      Process: {
        kicker: "Design Process",
        heading: "Layouts were iterated around sequence: what the viewer sees first, when detail expands, and how the structure resets for the next section.",
        text:
          "Instead of relying on card patterns, the system uses broad surfaces, shifting image ratios, and restrained labels to keep attention moving forward.",
        layout: "media",
        media: [
          caseStudyImages.gallery[0],
          caseStudyImages.grid[2],
          featuredPreviewImages[0],
        ],
      },
      "Final Design": {
        kicker: "Final Design",
        heading: "The final system frames each project as a crafted sequence, with stronger openings, cleaner metadata, and galleries that breathe.",
        text:
          "Each case study can now scale from a compact overview to a deeper walkthrough without changing the underlying structure or diluting the tone.",
        layout: "gallery",
        gallery: [
          projectImages["atlas-case"],
          caseStudyImages.gallery[0],
          caseStudyImages.grid[2],
        ],
      },
      Impact: {
        kicker: "Impact",
        heading: "The template improved how work is presented, making process visible without flattening the final result.",
        text:
          "The biggest gain was consistency. New projects can now slot into the same structure while still feeling tailored and considered.",
        layout: "impact",
        items: [
          "Stronger connection between rough thinking and polished output",
          "Lower friction when documenting new projects",
          "More editorial, less utilitarian presentation language",
        ],
      },
      Learnings: {
        kicker: "Learnings",
        heading: "Good case studies depend on cadence: too much proof at once makes even strong work feel heavier than it is.",
        text:
          "By tightening sequence and hierarchy, the template proves that documentation can reinforce brand tone rather than sit outside it.",
        layout: "text",
        notes: [
          "Captions become more useful when they clarify intent instead of repeating what the image already shows.",
          "Reusable templates only stay premium when they preserve enough room for asymmetry.",
        ],
      },
    },
  },
  "signal-duo": {
    menuSummary:
      "A modular identity and portfolio system focused on dark surfaces, brand presence, and controlled interaction.",
    sections: {
      Hero: {
        kicker: "Case Study Hero",
        heading: "Signal Duo is built as a modular portfolio identity, where typography, surfaces, and interaction states carry equal weight.",
        text:
          "The system had to feel bold and brand-forward without becoming louder than the work itself. That meant balancing graphic presence with consistent restraint.",
        layout: "hero",
        image: projectImages["signal-duo"],
      },
      Overview: {
        kicker: "Project Overview",
        heading: "Design an identity-led portfolio system that could span digital, print, and environmental applications with the same visual logic.",
        text:
          "The project focused on continuity: one tone, one set of visual rules, and one flexible structure that could support different formats without losing character.",
        layout: "overview",
        details: [
          ["Role", "Identity Designer / Frontend Builder"],
          ["Timeline", "7 weeks"],
          ["Scope", "Identity, portfolio system, print and digital applications"],
          ["Tools", "React, Figma, Adobe CC"],
        ],
      },
      Discovery: {
        kicker: "Exploration / Discovery",
        heading: "Discovery concentrated on how far the dark palette, cropped imagery, and mono accents could go before readability started to drop.",
        text:
          "Early studies tested the balance between atmosphere and legibility. The final direction reduced visual noise while keeping a distinct, high-contrast brand feel.",
        layout: "media",
        media: [
          featuredPreviewImages[3],
          featuredPreviewImages[4],
          caseStudyImages.media[2],
        ],
      },
      Process: {
        kicker: "Design Process",
        heading: "The process moved from identity building blocks into applications: posters, merchandise, portfolio frames, and interface surfaces.",
        text:
          "Consistency came from repeating a few strong rules across every application instead of introducing separate visual languages for each touchpoint.",
        layout: "media",
        media: [
          caseStudyImages.gallery[2],
          caseStudyImages.grid[1],
          projectImages["signal-duo"],
        ],
      },
      "Final Design": {
        kicker: "Final Design",
        heading: "The final system feels unified across brand, portfolio, and promotional contexts while keeping the interface spare and deliberate.",
        text:
          "The design relies on fewer components, larger type moments, and steadier interaction states to give the identity more authority.",
        layout: "gallery",
        gallery: [
          projectImages["signal-duo"],
          featuredPreviewImages[3],
          featuredPreviewImages[4],
        ],
      },
      Impact: {
        kicker: "Impact",
        heading: "The resulting identity system is easier to extend and stronger at holding attention across both digital and physical outputs.",
        text:
          "Instead of a one-off portfolio aesthetic, the work now operates as a consistent brand system that can scale to future formats and campaigns.",
        layout: "impact",
        items: [
          "More cohesive brand presence across every application",
          "Cleaner translation from identity rules into UI components",
          "A stronger visual signature without extra ornament",
        ],
      },
      Learnings: {
        kicker: "Learnings",
        heading: "The project confirmed that strong systems often come from limiting the palette of decisions, not expanding it.",
        text:
          "Once the core rules were clear, the design became easier to extend and easier to keep consistent across very different output types.",
        layout: "text",
        notes: [
          "Dark systems need disciplined spacing and hierarchy more than additional effects.",
          "A portfolio feels more authored when identity rules show up in subtle, repeated ways.",
        ],
      },
    },
  },
};

export const caseStudyProjects = featuredProjects.map((project) => ({
  ...project,
  menuSummary: caseStudiesById[project.id]?.menuSummary ?? project.summary,
}));

export const getCaseStudyById = (projectId) => (
  caseStudiesById[projectId] ?? caseStudiesById[featuredProjects[0].id]
);

export const getCaseStudyProjectById = (projectId) => (
  caseStudyProjects.find((project) => project.id === projectId) ?? caseStudyProjects[0]
);
