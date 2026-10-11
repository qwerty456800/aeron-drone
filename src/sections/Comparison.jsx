import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/capabilities.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "01",
    title: {
      de: (
        <>
          Luftbild
          <br />
          aufnahmen
        </>
      ),
      en: (
        <>
          Aerial
          <br />
          imaging
        </>
      ),
    },
    description: {
      de: "Hochauflösende Luftbilder mit stabilisierter Präzision auch in komplexen Umgebungen erfassen.",
      en: "Capture high-resolution aerial imagery with stabilized precision across complex environments.",
    },
    metadata: {
      de: ["48 MP Sensor", "RAW + 4K", "3-Achs-Stabilisierung"],
      en: ["48 MP sensor", "Raw + 4K", "3-axis stabilization"],
    },
    visual: "imaging",
  },
  {
    number: "02",
    title: {
      de: (
        <>
          Industrie
          <br />
          inspektion
        </>
      ),
      en: (
        <>
          Industrial
          <br />
          inspection
        </>
      ),
    },
    description: {
      de: "Strukturen und Infrastruktur aus schwierigen Winkeln inspizieren und dabei eine stabile Flugposition halten.",
      en: "Inspect structures and infrastructure from difficult angles while maintaining a stable operational position.",
    },
    metadata: {
      de: [
        "15 KM Steuerreichweite",
        "Live-Telemetrie",
        "Präzisionsschwebeflug",
      ],
      en: ["15 KM control range", "Live telemetry", "Precision hover"],
    },
    visual: "inspection",
  },
  {
    number: "03",
    title: {
      de: (
        <>
          Kartierung
          <br />& Vermessung
        </>
      ),
      en: (
        <>
          Mapping
          <br />& survey
        </>
      ),
    },
    description: {
      de: "Konsistente Luftdaten über große Flächen für Kartierung, Vermessung und räumliche Analysen erfassen.",
      en: "Collect consistent aerial data across large areas for mapping, surveying and spatial analysis.",
    },
    metadata: {
      de: ["42 MIN Flugzeit", "GPS-Positionierung", "Autonome Routen"],
      en: ["42 MIN flight", "GPS positioning", "Autonomous routes"],
    },
    visual: "mapping",
  },
];

function CapabilityVisual({ type }) {
  const { t } = useLanguage();
  const id = type === "imaging" ? "001" : type === "inspection" ? "002" : "003";
  const label =
    type === "imaging"
      ? t("opticalField")
      : type === "inspection"
        ? t("structuralScan")
        : t("surveyGrid");
  return (
    <div
      className={`capability-visual capability-visual--${type}`}
      aria-hidden="true"
    >
      <span className="visual-coordinate">
        LIB TECH / {t("fieldData")} / {id}
      </span>
      {type === "imaging" && (
        <>
          <i className="imaging-terrain imaging-terrain--one" />
          <i className="imaging-terrain imaging-terrain--two" />
          <i className="imaging-terrain imaging-terrain--three" />
          <i className="imaging-road" />
          <i className="imaging-building imaging-building--one" />
          <i className="imaging-building imaging-building--two" />
          <i className="imaging-building imaging-building--three" />
          <i className="imaging-capture-area" />
          <i className="imaging-target" />
          <i className="imaging-direction" />
        </>
      )}
      {type === "inspection" && (
        <>
          <i className="inspection-tower" />
          <i className="inspection-cross inspection-cross--one" />
          <i className="inspection-cross inspection-cross--two" />
          <i className="inspection-cross inspection-cross--three" />
          <span className="inspection-label inspection-label--one">P01</span>
          <span className="inspection-label inspection-label--two">P02</span>
          <span className="inspection-label inspection-label--three">P03</span>
          <i className="inspection-scan" />
        </>
      )}
      {type === "mapping" && (
        <>
          <i className="mapping-boundary" />
          <i className="mapping-terrain mapping-terrain--one" />
          <i className="mapping-terrain mapping-terrain--two" />
          <i className="mapping-route mapping-route--one" />
          <i className="mapping-route mapping-route--two" />
          <i className="mapping-route mapping-route--three" />
          <i className="mapping-route mapping-route--four" />
          <i className="mapping-waypoint mapping-waypoint--start" />
          <i className="mapping-waypoint mapping-waypoint--mid" />
          <i className="mapping-waypoint mapping-waypoint--end" />
          <span className="mapping-start-label">{t("start")}</span>
          <span className="mapping-end-label">{t("end")}</span>
        </>
      )}
      <span className="visual-label">{label}</span>
    </div>
  );
}

function Comparison() {
  const { language, t } = useLanguage();
  const rows = useRef([]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      rows.current.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          },
        );
        gsap.fromTo(
          row.querySelector(".capability-row__line"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          },
        );
      });
    });
    return () => context.revert();
  }, []);

  return (
    <section className="capabilities-section" id="capabilities">
      <div className="container capabilities-container">
        <header className="capabilities-header">
          <p className="eyebrow">04 / {t("capabilities")}</p>
          <h2>
            {t("builtFor")}
            <br />
            <strong>{t("mission")}</strong>
          </h2>
          <p>{t("oneAircraft")}</p>
          <span className="capabilities-divider" />
        </header>
        <div className="capability-list">
          {capabilities.map((capability, index) => (
            <article
              className="capability-row"
              key={capability.number}
              ref={(element) => {
                rows.current[index] = element;
              }}
            >
              <div className="capability-row__line" />
              <div className="capability-copy">
                <span className="capability-number">{capability.number} /</span>
                <h3>{capability.title[language]}</h3>
                <p>{capability.description[language]}</p>
              </div>
              <CapabilityVisual type={capability.visual} />
              <ul className="capability-meta">
                {capability.metadata[language].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Comparison;
