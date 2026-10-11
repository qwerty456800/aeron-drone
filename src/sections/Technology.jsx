import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechnologyDrone from "../three/TechnologyDrone.jsx";
import "../styles/technology.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  {
    index: "01",
    labelKey: "optical",
    titleKey: "precisionImaging",
    value: "48",
    unit: "MP",
    description: {
      de: "Hochauflösende Luftbildgebung für Inspektion, Kartierung und detaillierte visuelle Erfassung.",
      en: "High-resolution aerial imaging engineered for inspection, mapping and detailed visual capture.",
    },
    metadata: {
      de: ["Sensor / 48 MP", "Stabilisierung / Aktiv", "Aufnahme / RAW + 4K"],
      en: ["Sensor / 48 MP", "Stabilization / Active", "Capture / RAW + 4K"],
    },
    callout: "CAM / 48 MP",
  },
  {
    index: "02",
    labelKey: "flightCore",
    titleKey: "flightControl",
    value: "72",
    unit: "KM/H",
    description: {
      de: "Echtzeit-Flugverarbeitung gewährleistet Stabilität, Reaktionsfähigkeit und Kontrolle unter wechselnden Bedingungen.",
      en: "Real-time flight processing maintains stability, response and control across changing conditions.",
    },
    metadata: {
      de: [
        "Steuerung / Echtzeit",
        "Stabilität / Aktiv",
        "Höchstgeschw. / 72 KM/H",
      ],
      en: ["Control / Real-time", "Stability / Active", "Max speed / 72 KM/H"],
    },
    callout: "CORE / ACTIVE",
  },
  {
    index: "03",
    labelKey: "powerSystem",
    titleKey: "extendedFlight",
    value: "42",
    unit: "MIN",
    description: {
      de: "Hochdichte Energiearchitektur für längere Einsätze, ohne die Flugleistung zu beeinträchtigen.",
      en: "High-density power architecture designed for longer missions without compromising aircraft performance.",
    },
    metadata: {
      de: ["Flugzeit / 42 MIN", "Energie / Hohe Dichte", "Status / Nominal"],
      en: ["Flight time / 42 MIN", "Power / High-density", "Status / Nominal"],
    },
    callout: "PWR / 42 MIN",
  },
  {
    index: "04",
    labelKey: "transmission",
    titleKey: "longRange",
    value: "15",
    unit: "KM",
    description: {
      de: "Telemetrie und Steuerdaten mit geringer Latenz gewährleisten eine zuverlässige Verbindung über große Einsatzdistanzen.",
      en: "Low-latency telemetry and control transmission maintains a reliable aircraft link across extended operating range.",
    },
    metadata: {
      de: ["Reichweite / 15 KM", "Telemetrie / Live", "Verbindung / Sicher"],
      en: ["Control range / 15 KM", "Telemetry / Live", "Link / Secure"],
    },
    callout: "LINK / 15 KM",
  },
];

function Technology() {
  const { language, t } = useLanguage();
  const section = useRef(null);
  const stage = useRef(null);
  const drone = useRef(null);
  const panels = useRef([]);
  const callouts = useRef([]);
  const markers = useRef([]);
  const progress = useRef(null);
  const progressLine = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const setActive = (index) => {
        section.current.dataset.stage = index + 1;
        panels.current.forEach((item, itemIndex) =>
          item?.classList.toggle("is-active", itemIndex === index),
        );
        callouts.current.forEach((item, itemIndex) =>
          item?.classList.toggle("is-active", itemIndex === index),
        );
        markers.current.forEach((item, itemIndex) =>
          item?.classList.toggle("is-active", itemIndex === index),
        );
        if (progress.current)
          progress.current.textContent = `${String(index + 1).padStart(2, "0")} / 04`;
      };
      setActive(0);
      if (progressLine.current)
        progressLine.current.style.transform = "scaleY(0)";
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerWidth < 760
      ) {
        panels.current.forEach((item) => item?.classList.add("is-active"));
        callouts.current.forEach((item) => item?.classList.add("is-active"));
        return;
      }
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "bottom bottom",
            pin: stage.current,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const active = Math.min(3, Math.floor(self.progress * 4));
              drone.current?.setProgress(self.progress);
              if (progressLine.current)
                progressLine.current.style.transform = `scaleY(${self.progress})`;
              section.current.style.setProperty(
                "--technology-scan",
                `${self.progress * 100}%`,
              );
              section.current.style.setProperty(
                "--technology-outer-angle",
                `${-25 + self.progress * 35}deg`,
              );
              section.current.style.setProperty(
                "--technology-inner-angle",
                `${28 - self.progress * 24}deg`,
              );
              section.current.style.setProperty(
                "--technology-crosshair-x",
                `${self.progress * 1.2}rem`,
              );
              section.current.style.setProperty(
                "--technology-crosshair-y",
                `${self.progress * -0.7}rem`,
              );
              setActive(active);
            },
          },
        })
        .to({}, { duration: 1 });
      ScrollTrigger.refresh();
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section
      className="technology-section"
      id="technology"
      ref={section}
      data-stage="1"
    >
      <div className="technology-stage container" ref={stage}>
        <div className="technology-heading">
          <p className="eyebrow">02 / {t("technology")}</p>
          <h2>
            {language === "de" ? (
              t("systems")
            ) : (
              <>
                Aircraft
                <br />
                <strong>systems</strong>
              </>
            )}
          </h2>
          <p className="technology-subtitle">AERON X1 / {t("techPlatform")}</p>
        </div>
        <div className="technology-visual">
          <div className="technology-grid" />
          <div className="technology-ring technology-ring--outer" />
          <div className="technology-ring technology-ring--inner" />
          <div className="technology-crosshair" />
          <div className="technology-scan">
            <span>SCAN / ANALYSIS</span>
          </div>
          <div className="technology-focus" />
          <div className="technology-attitude">
            <span>STAB</span>
            <i />
          </div>
          <div className="technology-power">
            <span>PWR / NOMINAL</span>
            <i />
          </div>
          <div className="technology-transmission">
            <i />
            <i />
            <i />
            <span>LINK / SECURE</span>
          </div>
          <TechnologyDrone ref={drone} />
          {systems.map((system, index) => (
            <span
              className={`technology-marker technology-marker--${index + 1}`}
              key={system.index}
              ref={(element) => {
                markers.current[index] = element;
              }}
            >
              {system.index}
              <i />
            </span>
          ))}
          {systems.map((system, index) => (
            <span
              className={`technology-callout technology-callout--${index + 1}`}
              key={system.callout}
              ref={(element) => {
                callouts.current[index] = element;
              }}
            >
              {system.callout}
            </span>
          ))}
        </div>
        <div className="technology-details">
          {systems.map((system, index) => (
            <article
              className={`technology-system${index === 0 ? " is-active" : ""}`}
              key={system.index}
              ref={(element) => {
                panels.current[index] = element;
              }}
            >
              <p className="technology-system__eyebrow">
                {system.index} / {t(system.labelKey)}
              </p>
              <div className="technology-system__value">
                {system.value}
                <small>{system.unit}</small>
              </div>
              <h3>{t(system.titleKey)}</h3>
              <p>{system.description[language]}</p>
              <ul>
                {system.metadata[language].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="technology-progress">
          <span ref={progress}>01 / 04</span>
          <i ref={progressLine} />
          <div className="technology-progress__nodes">
            {systems.map((system) => (
              <i key={system.index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Technology;
