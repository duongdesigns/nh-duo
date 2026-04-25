import { caseStudyImages, featuredPreviewImages, projectImages } from "./imagery";
import {
  caseStudyMenuSummaries,
  caseStudyProjects,
  getCaseStudyProjectById,
} from "./caseStudyProjects";
import { featuredProjects } from "./projects";

const caseStudiesById = {
  tsuki: {
    menuSummary: caseStudyMenuSummaries.tsuki,
    sections: {
      Hero: {
        kicker: "Case Study Hero",
        heading: "TSUKI translates a premium sushi restaurant into a calm identity system built from moon symbolism, gold detail, and quiet digital pacing.",
        text:
          "The brand needed to feel elevated without becoming decorative. The direction pairs a restrained dark-green base with a warm gold mark, editorial menu systems, and a website that gives the food and atmosphere enough room to lead.",
        layout: "hero",
        image: projectImages.tsuki,
      },
      Overview: {
        kicker: "Project Overview",
        heading: "Create a premium restaurant identity that feels Japanese-inspired, modern, and usable across print, signage, web, and social touchpoints.",
        text:
          "The concept grew from a clear positioning problem: sushi restaurants often lean either traditional and familiar or trendy and loud. TSUKI needed a quieter space between both, with enough elegance for a premium audience and enough clarity for daily restaurant use.",
        layout: "overview",
        details: [
          ["Role", "Brand Designer / Creative Developer"],
          ["Timeline", "Concept project, 2025"],
          ["Scope", "Identity, logo system, menu design, website, social media"],
          ["Tools", "Figma, Adobe CC, AI image process visuals"],
        ],
      },
      Discovery: {
        kicker: "Exploration / Discovery",
        heading: "Research defined the audience, the premium positioning, and the visual tension between calm tradition and contemporary dining.",
        text:
          "The styleguide frames TSUKI around business dining, events, and design-aware guests who value quality, atmosphere, and restraint. Competitive review showed a gap for a brand that feels refined and distinctive without relying on visual excess.",
        layout: "media",
        media: [
          caseStudyImages.process[0],
          caseStudyImages.media[0],
          caseStudyImages.grid[1],
        ],
      },
      Process: {
        kicker: "Design Process",
        heading: "The core system came from reducing the brand to a few repeatable rules: moon mark, generous spacing, dark surfaces, and warm gold hierarchy.",
        text:
          "Logo studies explored the moon as a symbol of calm, purity, and continuity. The final direction uses a circular mark with a bridge-like division, wide-set lettering, and a limited color system so menus, web sections, and applications feel connected.",
        layout: "media",
        media: [
          caseStudyImages.process[1],
          caseStudyImages.mockups[0],
          caseStudyImages.grid[0],
        ],
      },
      "Final Design": {
        kicker: "Final Design",
        heading: "The final identity presents TSUKI as elegant but approachable, with print and digital materials sharing the same calm visual grammar.",
        text:
          "The menu system uses black surfaces, warm gold framing, and clear product grouping. The website extends that mood through large atmospheric imagery, restrained navigation, and a booking path that stays direct.",
        layout: "gallery",
        gallery: [
          caseStudyImages.hero[0],
          projectImages.tsuki,
          caseStudyImages.mockups[0],
          caseStudyImages.grid[0],
          caseStudyImages.media[0],
          caseStudyImages.gallery[2],
        ],
      },
      Impact: {
        kicker: "Impact",
        heading: "The outcome is a cohesive restaurant brand that can move from table menu to website to tote bag without losing its premium tone.",
        text:
          "Because the concept is built from a small set of rules, every touchpoint can be extended without inventing a new visual language. The system gives the restaurant a recognizable identity while keeping practical assets readable.",
        layout: "impact",
        items: [
          "Sharper premium positioning for business guests and design-aware diners",
          "Consistent logo, color, menu, website, and merchandise applications",
          "Clearer path from brand atmosphere to reservation and menu exploration",
        ],
      },
      Learnings: {
        kicker: "Learnings",
        heading: "The strongest branding decisions were the quietest ones: fewer colors, slower pacing, and enough negative space for the materials to feel intentional.",
        text:
          "TSUKI reinforced that restaurant branding has to be both atmospheric and operational. A mark can be symbolic, but menus, booking flows, and social assets still need simple rules that work under real conditions.",
        layout: "text",
        notes: [
          "A brand case study reads stronger when strategy, audience, process, and applications are shown as one connected chain.",
          "Premium restaurant design benefits from restraint when the food, menu structure, and booking path still need to stay clear.",
        ],
      },
    },
  },
  "atlas-case": {
    menuSummary: caseStudyMenuSummaries["atlas-case"],
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
    menuSummary: caseStudyMenuSummaries["signal-duo"],
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

export { caseStudyProjects, getCaseStudyProjectById };

export const getCaseStudyById = (projectId) => (
  caseStudiesById[projectId] ?? caseStudiesById[featuredProjects[0].id]
);
