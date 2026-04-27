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
        kicker: "Case-Study Hero",
        heading: "TSUKI übersetzt ein Premium-Sushi-Restaurant in ein ruhiges Identity-System aus Mondsymbolik, goldenen Details und leiser digitaler Dramaturgie.",
        text:
          "Die Marke sollte hochwertig wirken, ohne dekorativ zu werden. Die Richtung verbindet eine zurückhaltende dunkelgrüne Basis mit einem warmen goldenen Zeichen, redaktionellen Menüsystemen und einer Website, die Food und Atmosphäre genügend Raum gibt.",
        layout: "hero",
        image: projectImages.tsuki,
      },
      Überblick: {
        kicker: "Projektüberblick",
        heading: "Eine Premium-Restaurant-Identität entwickeln, die japanisch inspiriert, modern und über Print, Signage, Web und Social Touchpoints nutzbar ist.",
        text:
          "Das Konzept entstand aus einem klaren Positionierungsproblem: Sushi-Restaurants wirken oft entweder traditionell und vertraut oder trendig und laut. TSUKI sollte einen ruhigeren Raum dazwischen besetzen, mit genug Eleganz für ein Premium-Publikum und genug Klarheit für den täglichen Restaurantbetrieb.",
        layout: "overview",
        details: [
          ["Rolle", "Brand Designer / Creative Developer"],
          ["Zeitraum", "Konzeptprojekt, 2025"],
          ["Umfang", "Identität, Logo-System, Menüdesign, Website, Social Media"],
          ["Tools", "Figma, Adobe CC, KI-Prozessvisualisierungen"],
        ],
      },
      Exploration: {
        kicker: "Exploration / Recherche",
        heading: "Die Recherche definierte Zielgruppe, Premium-Positionierung und die visuelle Spannung zwischen ruhiger Tradition und zeitgemäßem Dining.",
        text:
          "Der Styleguide verortet TSUKI im Kontext von Business-Dining, Events und designbewussten Gästen, die Qualität, Atmosphäre und Zurückhaltung schätzen. Die Wettbewerbsanalyse zeigte eine Lücke für eine Marke, die raffiniert und eigenständig wirkt, ohne auf visuelle Überladung zu setzen.",
        layout: "media",
        media: [
          caseStudyImages.process[0],
          caseStudyImages.process[2],
          caseStudyImages.grid[1],
        ],
      },
      Prozess: {
        kicker: "Designprozess",
        heading: "Das Kernsystem entstand durch Reduktion auf wenige wiederholbare Regeln: Mondzeichen, großzügige Abstände, dunkle Flächen und warme goldene Hierarchie.",
        text:
          "Logo-Studien untersuchten den Mond als Symbol für Ruhe, Reinheit und Kontinuität. Die finale Richtung nutzt ein kreisförmiges Zeichen mit brückenartiger Teilung, weit gesetzte Typografie und ein begrenztes Farbsystem, damit Menüs, Webbereiche und Anwendungen verbunden wirken.",
        layout: "media",
        media: [
          caseStudyImages.process[1],
          caseStudyImages.mockups[0],
          caseStudyImages.media[0],
        ],
      },
      "Finales Design": {
        kicker: "Finales Design",
        heading: "Die finale Identität zeigt TSUKI elegant, aber zugänglich, mit Print- und Digitalmaterialien, die dieselbe ruhige visuelle Grammatik teilen.",
        text:
          "Das Menüsystem arbeitet mit schwarzen Flächen, warmen goldenen Rahmungen und klarer Produktgruppierung. Die Website erweitert diese Stimmung durch große atmosphärische Bilder, zurückhaltende Navigation und einen direkten Buchungspfad.",
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
      Wirkung: {
        kicker: "Wirkung",
        heading: "Das Ergebnis ist eine kohärente Restaurantmarke, die vom Tischmenü über die Website bis zur Tasche ihren Premium-Ton hält.",
        text:
          "Weil das Konzept auf wenigen klaren Regeln basiert, kann jeder Touchpoint erweitert werden, ohne eine neue visuelle Sprache zu erfinden. Das System gibt dem Restaurant Wiedererkennbarkeit und hält praktische Materialien lesbar.",
        layout: "impact",
        items: [
          "Schärfere Premium-Positionierung für Business-Gäste und designbewusste Besucher",
          "Konsistente Anwendungen für Logo, Farbe, Menü, Website und Merchandise",
          "Klarerer Weg von Markenatmosphäre zu Reservierung und Menü-Exploration",
        ],
      },
      Erkenntnisse: {
        kicker: "Erkenntnisse",
        heading: "Die stärksten Branding-Entscheidungen waren die ruhigsten: weniger Farben, langsameres Pacing und genug Weißraum, damit die Materialien bewusst wirken.",
        text:
          "TSUKI hat bestätigt, dass Restaurant-Branding atmosphärisch und zugleich operativ funktionieren muss. Ein Zeichen darf symbolisch sein, aber Menüs, Buchungsflows und Social Assets brauchen einfache Regeln, die unter realen Bedingungen tragen.",
        layout: "text",
        notes: [
          "Eine Marken-Fallstudie wirkt stärker, wenn Strategie, Zielgruppe, Prozess und Anwendungen als zusammenhängende Kette gezeigt werden.",
          "Premium-Restaurantdesign profitiert von Zurückhaltung, solange Food, Menüstruktur und Buchungspfad klar bleiben.",
        ],
      },
    },
  },
  "atlas-case": {
    menuSummary: caseStudyMenuSummaries["atlas-case"],
    sections: {
      Hero: {
        kicker: "Case-Study Hero",
        heading: "Platzhalter für eine spätere Fallstudie, die Projektkontext, Prozess und Ergebnis in einer ruhigen Dramaturgie bündelt.",
        text:
          "Dieser Text wird später durch eine echte Projektbeschreibung ersetzt. Bis dahin markiert er die Tonalität, Länge und Position des Inhalts.",
        layout: "hero",
        image: projectImages["atlas-case"],
      },
      Überblick: {
        kicker: "Projektüberblick",
        heading: "Platzhalter für Ziel, Rolle und Umfang des Projekts.",
        text:
          "Hier steht später eine kurze Einordnung des Projekts. Der Abschnitt bleibt bewusst knapp und übersichtlich.",
        layout: "overview",
        details: [
          ["Rolle", "Platzhalter"],
          ["Zeitraum", "Platzhalter"],
          ["Umfang", "Platzhalter"],
          ["Tools", "Platzhalter"],
        ],
      },
      Exploration: {
        kicker: "Exploration",
        heading: "Platzhalter für Recherche, Referenzen und frühe visuelle Richtung.",
        text:
          "Dieser Abschnitt beschreibt später, welche Beobachtungen und Entscheidungen die visuelle Richtung geprägt haben.",
        layout: "media",
        media: [
          featuredPreviewImages[2],
          featuredPreviewImages[1],
          caseStudyImages.media[1],
        ],
      },
      Prozess: {
        kicker: "Prozess",
        heading: "Platzhalter für Iterationen, Zwischenstände und gestalterische Entscheidungen.",
        text:
          "Hier kann später erklärt werden, welche Varianten getestet wurden und warum die finale Richtung funktioniert.",
        layout: "media",
        media: [
          caseStudyImages.gallery[0],
          caseStudyImages.grid[2],
          featuredPreviewImages[0],
        ],
      },
      "Finales Design": {
        kicker: "Finales Design",
        heading: "Platzhalter für das finale Ergebnis und seine wichtigsten Anwendungen.",
        text:
          "Der spätere Text beschreibt die finale Lösung, die Bildauswahl und die wichtigsten Details.",
        layout: "gallery",
        gallery: [
          projectImages["atlas-case"],
          caseStudyImages.gallery[0],
          caseStudyImages.grid[2],
        ],
      },
      Wirkung: {
        kicker: "Wirkung",
        heading: "Platzhalter für Wirkung, Ergebnis oder messbare Verbesserung.",
        text:
          "Dieser Bereich hält später fest, was sich durch das Projekt verbessert hat.",
        layout: "impact",
        items: [
          "Platzhalter für Ergebnis eins",
          "Platzhalter für Ergebnis zwei",
          "Platzhalter für Ergebnis drei",
        ],
      },
      Erkenntnisse: {
        kicker: "Erkenntnisse",
        heading: "Platzhalter für Erkenntnisse aus dem Projekt.",
        text:
          "Hier stehen später kurze Erkenntnisse, die den Prozess reflektieren und auf künftige Projekte übertragbar sind.",
        layout: "text",
        notes: [
          "Platzhalter für eine konkrete Erkenntnis.",
          "Platzhalter für eine zweite konkrete Erkenntnis.",
        ],
      },
    },
  },
  "signal-duo": {
    menuSummary: caseStudyMenuSummaries["signal-duo"],
    sections: {
      Hero: {
        kicker: "Case-Study Hero",
        heading: "Platzhalter für ein digitales Projekt mit klarer Oberfläche, ruhiger Struktur und später ergänzbaren Inhalten.",
        text:
          "Dieser Bereich dient als Platzhalter für die spätere Projektgeschichte und hält aktuell nur Rhythmus und Textlänge der Seite.",
        layout: "hero",
        image: projectImages["signal-duo"],
      },
      Überblick: {
        kicker: "Projektüberblick",
        heading: "Platzhalter für Aufgabe, Rolle und Rahmenbedingungen.",
        text:
          "Hier wird später beschrieben, warum das Projekt entstanden ist und welche Anforderungen wichtig waren.",
        layout: "overview",
        details: [
          ["Rolle", "Platzhalter"],
          ["Zeitraum", "Platzhalter"],
          ["Umfang", "Platzhalter"],
          ["Tools", "Platzhalter"],
        ],
      },
      Exploration: {
        kicker: "Exploration",
        heading: "Platzhalter für Recherche, Mood und erste Systemansätze.",
        text:
          "Der spätere Inhalt kann hier Referenzen, Skizzen, Tests und die daraus entstandenen Entscheidungen erklären.",
        layout: "media",
        media: [
          featuredPreviewImages[3],
          featuredPreviewImages[4],
          caseStudyImages.media[2],
        ],
      },
      Prozess: {
        kicker: "Prozess",
        heading: "Platzhalter für Layouttests, Komponenten und visuelle Regeln.",
        text:
          "Dieser Abschnitt beschreibt später die Entwicklung vom ersten Ansatz bis zur finalen Ausarbeitung.",
        layout: "media",
        media: [
          caseStudyImages.gallery[2],
          caseStudyImages.grid[1],
          projectImages["signal-duo"],
        ],
      },
      "Finales Design": {
        kicker: "Finales Design",
        heading: "Platzhalter für finale Screens, Anwendungen und Ergebnisbilder.",
        text:
          "Hier folgt später eine knappe Beschreibung der finalen Lösung und ihrer wichtigsten Eigenschaften.",
        layout: "gallery",
        gallery: [
          projectImages["signal-duo"],
          featuredPreviewImages[3],
          featuredPreviewImages[4],
        ],
      },
      Wirkung: {
        kicker: "Wirkung",
        heading: "Platzhalter für Nutzen, Ergebnis und Ausblick.",
        text:
          "Dieser Bereich fasst später zusammen, was das Projekt geleistet hat.",
        layout: "impact",
        items: [
          "Platzhalter für Nutzen eins",
          "Platzhalter für Nutzen zwei",
          "Platzhalter für Nutzen drei",
        ],
      },
      Erkenntnisse: {
        kicker: "Erkenntnisse",
        heading: "Platzhalter für Erkenntnisse und nächste Schritte.",
        text:
          "Hier können später Erkenntnisse ergänzt werden, die aus Prozess, Feedback und Umsetzung entstanden sind.",
        layout: "text",
        notes: [
          "Platzhalter für eine Erkenntnis aus dem Prozess.",
          "Platzhalter für eine Erkenntnis aus der Umsetzung.",
        ],
      },
    },
  },
};

export { caseStudyProjects, getCaseStudyProjectById };

export const getCaseStudyById = (projectId) => (
  caseStudiesById[projectId] ?? caseStudiesById[featuredProjects[0].id]
);
