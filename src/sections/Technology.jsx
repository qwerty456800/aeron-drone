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
    labelKey: "technologyAirframe",
    titleKey: "technologyCarbonPlatform",
    value: "650",
    unit: "MM",
    description: {
      de: "Carbonfaser-Rahmen mit 650 mm Radstand für stabile Flugentwicklung und modulare Nutzlastintegration.",
      en: "Carbon fiber frame with a 650 mm wheelbase for stable flight development and modular payload integration.",
    },
    metadata: {
      de: ["Flugsteuerung / Pixhawk", "GPS / M10", "Rahmen / Carbonfaser"],
      en: ["Flight controller / Pixhawk", "GPS / M10", "Frame / Carbon fiber"],
    },
    callout: "X650 / CORE",
  },
  {
    index: "02",
    labelKey: "technologyPowerSystem",
    titleKey: "technologyPowerIntegration",
    value: "6S",
    unit: "LIPO",
    description: {
      de: "6S-LiPo-Kompatibilität, integrierte Stromverteilung und flexible Montageflächen unterstützen die Systemintegration.",
      en: "6S LiPo compatibility, integrated power distribution and flexible mounting surfaces support system integration.",
    },
    metadata: {
      de: ["Plattform / Geräumig", "Schienen / Integriert", "Akku / 6S LiPo"],
      en: ["Platform / Spacious", "Rails / Integrated", "Battery / 6S LiPo"],
    },
    callout: "X650 / INTEGRATION",
  },
  {
    index: "03",
    labelKey: "technologyPayload",
    titleKey: "technologyPayloadCapacity",
    value: "3.1",
    unit: "KG*",
    description: {
      de: "Bis zu 3,1 kg Nutzlast mit 6S-10000-mAh-Akku-Konfiguration. Konfigurationsabhängiger Maximalwert.",
      en: "Up to 3.1 kg payload with the 6S 10000 mAh battery configuration. Configuration-dependent maximum.",
    },
    metadata: {
      de: ["Nutzlast / Bis 3,1 KG", "Akku / 6S 10000 mAh", "Wert / Maximal*"],
      en: [
        "Payload / Up to 3.1 KG",
        "Battery / 6S 10000 mAh",
        "Value / Maximum*",
      ],
    },
    callout: "X650 / PAYLOAD",
  },
  {
    index: "04",
    labelKey: "technologyEndurance",
    titleKey: "technologyFlightEndurance",
    value: "30",
    unit: "MIN*",
    description: {
      de: "Bis zu 30 Minuten Flugausdauer, abhängig von Akkukonfiguration, Nutzlast und Betriebsbedingungen.",
      en: "Up to 30 minutes of flight endurance, depending on battery configuration, payload and operating conditions.",
    },
    metadata: {
      de: [
        "Flugzeit / 30 MIN*",
        "Motoren / MN4014 KV330",
        "Propeller / 1555 Carbon",
      ],
      en: [
        "Flight time / 30 MIN*",
        "Motors / MN4014 KV330",
        "Propellers / 1555 Carbon",
      ],
    },
    callout: "X650 / ENDURANCE",
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
          <p className="technology-subtitle">X650 / {t("techPlatform")}</p>
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
