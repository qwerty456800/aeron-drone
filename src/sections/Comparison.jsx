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
          Integration
          <br />& Montage
        </>
      ),
      en: (
        <>
          Integration
          <br />& Mounting
        </>
      ),
    },
    description: {
      de: "Geräumige Montageflächen und Schienensysteme erleichtern die Integration von Zubehör und Companion Computern.",
      en: "Spacious mounting surfaces and rail systems support accessories and companion computer integration.",
    },
    metadata: {
      de: ["Schienensystem", "Carbonfaser-Rahmen", "Lötfreie Montage"],
      en: ["Rail mounting", "Carbon fiber frame", "Solder-free assembly"],
    },
    visual: "imaging",
  },
  {
    number: "02",
    title: {
      de: (
        <>
          Nutzlast &<br />
          Flugzeit
        </>
      ),
      en: (
        <>
          Payload &<br />
          Endurance
        </>
      ),
    },
    description: {
      de: "Konfigurationsabhängige Nutzlast und Flugzeit für Entwicklungs- und Integrationsaufgaben.",
      en: "Configuration-dependent payload and flight time for development and integration work.",
    },
    metadata: {
      de: ["Bis 3,1 KG*", "30 MIN*", "6S LiPo"],
      en: ["Up to 3.1 KG*", "30 MIN*", "6S LiPo"],
    },
    visual: "inspection",
  },
  {
    number: "03",
    title: {
      de: (
        <>
          Flugsteuerung
          <br />&<br />
          Telemetrie
        </>
      ),
      en: (
        <>
          Flight
          <br />
          control &
          <br />
          telemetry
        </>
      ),
    },
    description: {
      de: "Pixhawk, M10 GPS und SiK-Telemetrie als flexible Basis für PX4- und ArduPilot-Projekte.",
      en: "Pixhawk, M10 GPS and SiK telemetry as a flexible base for PX4 and ArduPilot projects.",
    },
    metadata: {
      de: ["Pixhawk 6C / 6X", "M10 GPS", "SiK 433 / 915 MHz"],
      en: ["Pixhawk 6C / 6X", "M10 GPS", "SiK 433 / 915 MHz"],
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
  const diagram = {
    imaging: (
      <svg
        viewBox="0 0 640 360"
        role="img"
        aria-label="Conceptual X650 integration frame layout"
      >
        <g className="capability-svg__secondary">
          <circle cx="320" cy="180" r="104" />
          <circle cx="320" cy="180" r="72" />
          <path d="M320 180 152 82M320 180 488 82M320 180 152 278M320 180 488 278" />
          <path d="M118 180h404M320 46v268" />
        </g>
        <g className="capability-svg__primary">
          <rect x="255" y="115" width="130" height="130" />
          <rect x="280" y="140" width="80" height="80" />
          <circle cx="320" cy="180" r="18" />
          <path d="M248 108h-26v26M392 108h26v26M248 252h-26v-26M392 252h26v-26" />
        </g>
        <g className="capability-svg__label">
          <text x="66" y="72">
            MOUNT / ZONE A
          </text>
          <text x="414" y="302">
            INTEGRATION PLANE
          </text>
        </g>
      </svg>
    ),
    inspection: (
      <svg
        viewBox="0 0 640 360"
        role="img"
        aria-label="X650 payload and endurance specifications"
      >
        <g className="capability-svg__secondary">
          <path d="M72 88h496M72 180h496M72 272h496" />
          <path d="M72 54v252M568 54v252" />
        </g>
        <g className="capability-svg__primary">
          <path d="M72 88h22M72 180h22M72 272h22" />
          <path d="M178 88h270M178 180h270M178 272h270" />
          <circle cx="178" cy="88" r="5" />
          <circle cx="178" cy="180" r="5" />
          <circle cx="178" cy="272" r="5" />
        </g>
        <g className="capability-svg__label">
          <text x="104" y="68">
            PAYLOAD CAPACITY
          </text>
          <text x="470" y="94">
            UP TO 3.1 KG*
          </text>
          <text x="104" y="160">
            FLIGHT ENDURANCE
          </text>
          <text x="470" y="186">
            UP TO 30 MIN*
          </text>
          <text x="104" y="252">
            BATTERY COMPATIBILITY
          </text>
          <text x="470" y="278">
            6S LIPO
          </text>
        </g>
      </svg>
    ),
    mapping: (
      <svg
        viewBox="0 0 640 360"
        role="img"
        aria-label="Conceptual X650 flight control and telemetry architecture"
      >
        <g className="capability-svg__secondary">
          <path d="M110 180h420M320 58v244" />
          <path d="M180 102 460 258M180 258 460 102" />
        </g>
        <g className="capability-svg__primary">
          <rect x="268" y="138" width="104" height="84" />
          <path d="M268 160h-90v-44M372 160h90v-44M268 200h-90v44M372 200h90v44" />
          <circle cx="160" cy="116" r="10" />
          <circle cx="480" cy="116" r="10" />
          <circle cx="160" cy="244" r="10" />
          <circle cx="480" cy="244" r="10" />
        </g>
        <g className="capability-svg__label">
          <text x="284" y="174">
            PIXHAWK
          </text>
          <text x="284" y="194">
            FLIGHT CONTROL
          </text>
          <text x="92" y="92">
            M10 GPS
          </text>
          <text x="430" y="92">
            SiK TELEMETRY
          </text>
          <text x="86" y="280">
            POWER DISTRIBUTION
          </text>
        </g>
      </svg>
    ),
  }[type];

  return (
    <div
      className={`capability-visual capability-visual--${type}`}
      aria-hidden="true"
    >
      <span className="visual-coordinate">
        LIBTEC / {t("fieldData")} / {id}
      </span>
      {diagram}
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
          <p className="eyebrow">04 / X650</p>
          <h2>
            {t("capabilityIntegration")}
            <br />
            <strong>{t("fieldPlatform")}</strong>
          </h2>
          <p>{t("officialNote")}</p>
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
