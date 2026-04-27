import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

import AnimatedHeadline from "../components/layout/AnimatedHeadline";
import SectionEyebrow from "../components/layout/SectionEyebrow";

const legalContent = {
  impressum: {
    eyebrow: "Rechtliches",
    title: "Impressum",
    intro:
      "Angaben gemaess § 5 DDG. Dies ist ein generischer Platzhalter und keine Rechtsberatung. Bitte ersetzen Sie alle Platzhalter vor einer Veroeffentlichung durch die tatsaechlichen Betreiberangaben.",
    sections: [
      {
        title: "Diensteanbieter",
        body: [
          "[Vorname Nachname / Firmenname]",
          "[Strasse Hausnummer]",
          "[PLZ Ort]",
          "Deutschland",
        ],
      },
      {
        title: "Kontakt",
        body: [
          "E-Mail: [hello@example.com]",
          "Telefon: [Telefonnummer, falls vorhanden]",
        ],
      },
      {
        title: "Vertreten durch",
        body: [
          "[Name der vertretungsberechtigten Person, falls zutreffend]",
        ],
      },
      {
        title: "Umsatzsteuer-ID",
        body: [
          "Umsatzsteuer-Identifikationsnummer gemaess § 27a Umsatzsteuergesetz: [USt-IdNr., falls vorhanden]",
        ],
      },
      {
        title: "Berufsrechtliche Angaben",
        body: [
          "[Berufsbezeichnung, Kammer, Aufsichtsbehoerde und berufsrechtliche Regelungen, falls zutreffend]",
        ],
      },
      {
        title: "Verantwortlich fuer den Inhalt",
        body: [
          "Verantwortlich nach § 18 Abs. 2 MStV: [Vorname Nachname, Anschrift]",
        ],
      },
      {
        title: "EU-Streitschlichtung",
        body: [
          "Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: https://ec.europa.eu/consumers/odr/",
          "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen, sofern keine gesetzliche Pflicht besteht.",
        ],
      },
      {
        title: "Haftung fuer Inhalte und Links",
        body: [
          "Als Diensteanbieter sind wir fuer eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Fuer fremde Inhalte, auf die verlinkt wird, uebernehmen wir keine Gewaehr. Bei Bekanntwerden von Rechtsverletzungen entfernen wir entsprechende Links unverzueglich.",
        ],
      },
    ],
  },
  datenschutz: {
    eyebrow: "Datenschutz",
    title: "Datenschutzerklaerung",
    intro:
      "Diese generische Datenschutzerklaerung dient als Platzhalter fuer eine einfache Portfolio-Website und ist keine Rechtsberatung. Bitte passen Sie sie an die tatsaechlich eingesetzten Dienste, Hosting-Anbieter, Formulare, Analyse-Tools und Cookies an.",
    sections: [
      {
        title: "Verantwortlicher",
        body: [
          "Verantwortlich fuer die Datenverarbeitung auf dieser Website ist:",
          "[Vorname Nachname / Firmenname]",
          "[Strasse Hausnummer]",
          "[PLZ Ort], Deutschland",
          "E-Mail: [hello@example.com]",
        ],
      },
      {
        title: "Allgemeine Hinweise zur Datenverarbeitung",
        body: [
          "Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung von Anfragen oder aufgrund gesetzlicher Pflichten erforderlich ist. Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a, b, c und f DSGVO.",
        ],
      },
      {
        title: "Hosting und Server-Logfiles",
        body: [
          "Beim Aufruf der Website werden technisch notwendige Daten verarbeitet, zum Beispiel IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem. Diese Daten dienen der sicheren und stabilen Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
          "Hosting-Anbieter: [Name und Anschrift des Hosting-Anbieters eintragen].",
          "Speicherdauer: [konkrete Logfile-Speicherdauer eintragen].",
        ],
      },
      {
        title: "Kontaktaufnahme",
        body: [
          "Wenn Sie uns per E-Mail oder Kontaktformular kontaktieren, verarbeiten wir die von Ihnen uebermittelten Angaben zur Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage mit einem Vertrag oder vorvertraglichen Massnahmen zusammenhaengt, andernfalls Art. 6 Abs. 1 lit. f DSGVO.",
          "Die Daten werden geloescht, sobald die Anfrage abschliessend bearbeitet wurde und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
        ],
      },
      {
        title: "Cookies und lokale Speicherung",
        body: [
          "Diese Website verwendet derzeit nur technisch notwendige Speicherungen, sofern dies fuer die Funktion der Website erforderlich ist. Falls Analyse-, Marketing- oder Drittanbieter-Cookies eingesetzt werden, muessen diese hier konkret beschrieben und gegebenenfalls nur nach Einwilligung gesetzt werden.",
        ],
      },
      {
        title: "Eingebundene Drittanbieter",
        body: [
          "[Falls externe Schriftarten, Karten, Videos, Analyse-Tools, CDN-Dienste oder Formularanbieter genutzt werden, Anbieter, Zweck, Rechtsgrundlage, Datenuebermittlung und Speicherdauer hier ergaenzen.]",
        ],
      },
      {
        title: "Empfaenger und Drittlanduebermittlung",
        body: [
          "Personenbezogene Daten werden nur an Dienstleister weitergegeben, wenn dies fuer Betrieb, Sicherheit oder Bearbeitung von Anfragen erforderlich ist. Eine Uebermittlung in Drittlaender ausserhalb der EU/des EWR erfolgt nur, wenn hierfuer eine geeignete Rechtsgrundlage besteht, zum Beispiel ein Angemessenheitsbeschluss oder geeignete Garantien nach Art. 44 ff. DSGVO.",
        ],
      },
      {
        title: "Ihre Rechte",
        body: [
          "Sie haben nach Massgabe der DSGVO das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung, Datenuebertragbarkeit und Widerspruch gegen bestimmte Verarbeitungen. Soweit eine Verarbeitung auf Einwilligung beruht, koennen Sie diese Einwilligung jederzeit mit Wirkung fuer die Zukunft widerrufen.",
        ],
      },
      {
        title: "Beschwerderecht",
        body: [
          "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehoerde zu beschweren, insbesondere in dem Mitgliedstaat Ihres gewoehnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts des mutmasslichen Verstosses.",
        ],
      },
      {
        title: "Stand",
        body: [
          "April 2026",
        ],
      },
    ],
  },
};

function LegalPage({ type = "impressum" }) {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const content = legalContent[type] ?? legalContent.impressum;

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const atmosphere = root.current?.querySelector("[data-page-atmosphere]");
      const blocks = root.current?.querySelectorAll("[data-legal-block]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (atmosphere) {
        tl.from(atmosphere, {
          opacity: 0,
          duration: 0.9,
        });
      }

      if (blocks?.length) {
        tl.from(
          blocks,
          {
            y: 18,
            opacity: 0,
            duration: 0.58,
            stagger: 0.06,
          },
          "-=0.46"
        );
      }
    },
    { scope: root, dependencies: [prefersReducedMotion, type] }
  );

  return (
    <section ref={root} className="page-shell">
      <div
        aria-hidden="true"
        data-page-atmosphere
        className="page-atmosphere page-atmosphere--contact"
      />

      <div className="content-shell grid gap-12">
        <header data-legal-block>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <AnimatedHeadline
            as="h1"
            className="page-title mb-8 max-w-[24ch] xl:mb-7 xl:max-w-[22ch]"
          >
            {content.title}
          </AnimatedHeadline>
          <p className="body-safe body-safe--wide text-base leading-[1.8] text-white/60 md:text-lg">
            {content.intro}
          </p>
        </header>

        <div className="grid gap-5">
          {content.sections.map((section) => (
            <article
              key={section.title}
              data-legal-block
              className="border-t border-white/10 pt-5"
            >
              <h2 className="text-[1.08rem] font-medium leading-tight tracking-[-0.035em] text-white">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-3">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="body-safe body-safe--wide max-w-[76ch] text-sm leading-7 text-white/62 md:text-[0.96rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LegalPage;
