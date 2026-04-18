import homannWebsite from "../assets/project-images/homann-website.webp";
import bookMockup from "../assets/project-images/book-mockup.webp";
import busStopCitilight from "../assets/project-images/bus-stop-citilight.webp";
import designmagazinCover from "../assets/project-images/designmagazin-cover.webp";
import drinksBig from "../assets/project-images/drinks-big.webp";
import faltblattflyer from "../assets/project-images/faltblattflyer.webp";
import flyer3Mockup from "../assets/project-images/flyer3-mockup.webp";
import macbookMockup from "../assets/project-images/macbook-mockup.webp";
import menuBig from "../assets/project-images/menu-big.webp";
import menuKleinOffenMockup from "../assets/project-images/menu-klein-offen-mockup.webp";
import menuMockup2 from "../assets/project-images/menu-mockup2.webp";
import menuSmall from "../assets/project-images/menu-small.webp";
import shoppingbag from "../assets/project-images/shoppingbag.webp";
import zpFlyer from "../assets/project-images/zp-flyer.webp";

const localSource = 'Local portfolio asset provided by the project owner.';

export const projectImages = {
  "nord-form": {
    src: macbookMockup,
    alt: "MacBook mockup showing a dark restaurant website interface with warm gold typography.",
    source: localSource,
    position: "50% 58%",
  },
  "atlas-case": {
    src: bookMockup,
    alt: "Book mockup featuring an illustrated cover with contrasting black and white creatures.",
    source: localSource,
    position: "50% 30%",
  },
  "signal-duo": {
    src: busStopCitilight,
    alt: "Bus stop advertising mockup showing a dark sushi brand poster in an urban setting.",
    source: localSource,
    position: "63% 44%",
  },
};

export const featuredPreviewImages = [
  {
    src: homannWebsite,
    alt: "Website landing page mockup with a light interface and blue accent branding.",
    source: localSource,
    position: "50% 10%",
  },
  {
    src: designmagazinCover,
    alt: "Editorial design poster with bold typography and layered geometric gradients on a dark background.",
    source: localSource,
    position: "52% 28%",
  },
  {
    src: flyer3Mockup,
    alt: "Foldout flyer presentation for a book project arranged across a neutral studio background.",
    source: localSource,
    position: "50% 38%",
  },
  {
    src: shoppingbag,
    alt: "Canvas tote bag mockup featuring a minimal sushi brand mark.",
    source: localSource,
    position: "50% 34%",
  },
  {
    src: menuSmall,
    alt: "Compact folded menu mockup with a dark layout and refined gold linework.",
    source: localSource,
    position: "50% 46%",
  },
];

export const caseStudyImages = {
  hero: [
    {
      src: menuBig,
      alt: "Large open menu mockup with dark pages, food photography, and gold typography.",
      source: localSource,
      position: "50% 58%",
    },
  ],
  media: [
    {
      src: drinksBig,
      alt: "Open drinks menu mockup laid out on a clean studio background.",
      source: localSource,
      position: "50% 44%",
    },
    {
      src: zpFlyer,
      alt: "Planetarium event flyer mockup with deep-space imagery and bold white typography.",
      source: localSource,
      position: "50% 44%",
    },
    {
      src: faltblattflyer,
      alt: "Folded brochure mockup showing a dark editorial print layout with fine gold details.",
      source: localSource,
      position: "50% 50%",
    },
  ],
  grid: [
    {
      src: menuMockup2,
      alt: "Angled menu mockup showing plated dishes within a dark premium restaurant layout.",
      source: localSource,
      position: "50% 56%",
    },
    {
      src: menuKleinOffenMockup,
      alt: "Small open menu mockup with detailed menu sections on black pages.",
      source: localSource,
      position: "50% 50%",
    },
    {
      src: designmagazinCover,
      alt: "Graphic design cover composition using bold type and geometric forms.",
      source: localSource,
      position: "52% 28%",
    },
  ],
  gallery: [
    {
      src: flyer3Mockup,
      alt: "Book marketing flyer series displayed in a flatlay arrangement.",
      source: localSource,
      position: "50% 38%",
    },
    {
      src: homannWebsite,
      alt: "Homepage design screenshot for a branding agency website.",
      source: localSource,
      position: "50% 10%",
    },
    {
      src: shoppingbag,
      alt: "Merchandise mockup with a minimal logo applied to a fabric tote bag.",
      source: localSource,
      position: "50% 34%",
    },
  ],
};
