import SpecificationGroup from "../components/SpecificationGroup.jsx";
import "../styles/specifications.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const groups = [
  {
    number: "01",
    title: { en: "Frame", de: "Rahmen" },
    items: [
      ["Wheelbase", "650 mm"],
      ["Frame", { en: "Carbon fiber", de: "Carbonfaser" }],
      ["Motors", "Tmotor MN4014 KV330"],
      [
        "Propellers",
        { en: "Gemfan 1555 carbon fiber", de: "Gemfan 1555 Carbonfaser" },
      ],
    ],
  },
  {
    number: "02",
    title: { en: "Flight", de: "Flug" },
    items: [
      ["Flight time", "30 MIN*"],
      ["Max takeoff weight", "6.3 KG*"],
      ["Payload", { en: "Up to 3.1 kg*", de: "Bis 3,1 kg*" }],
      ["Battery", "6S 5000–12000 mAh LiPo"],
    ],
  },
  {
    number: "03",
    title: { en: "Flight control", de: "Flugsteuerung" },
    items: [
      ["Controller", "Pixhawk 6C / 6X"],
      ["GPS", "M10 GPS"],
      ["Telemetry", "SiK 433 / 915 MHz"],
      ["Firmware", "PX4 / ArduPilot compatible"],
    ],
  },
  {
    number: "04",
    title: { en: "Power & frame", de: "Energie & Rahmen" },
    items: [
      ["Battery compatibility", "6S LiPo / XT60"],
      ["Power distribution", "XT60 / XT30 PDB"],
      [
        "Arm connectors",
        { en: "Foldable aluminum", de: "Klappbares Aluminium" },
      ],
      [
        "Assembly",
        { en: "No soldering required", de: "Keine Lötarbeiten erforderlich" },
      ],
    ],
  },
  {
    number: "05",
    title: { en: "Integration", de: "Integration" },
    items: [
      [
        "Platform",
        {
          en: "Companion computer ready",
          de: "Für Companion Computer vorbereitet",
        },
      ],
      ["Mounting plate", "120 × 128 mm"],
      ["Rail system", "Dual 10 mm × 320 mm"],
      [
        "Note",
        {
          en: "Configuration-dependent values",
          de: "Konfigurationsabhängige Werte",
        },
      ],
    ],
  },
];

const labels = {
  en: {
    Frame: "FRAME",
    Motors: "MOTORS",
    Propellers: "PROPELLERS",
    Wheelbase: "WHEELBASE",
    "Flight time": "FLIGHT TIME",
    "Max takeoff weight": "MAX. TAKEOFF WEIGHT",
    Payload: "PAYLOAD",
    Battery: "BATTERY",
    Controller: "CONTROLLER",
    GPS: "GPS",
    Telemetry: "TELEMETRY",
    Firmware: "FIRMWARE",
    "Battery compatibility": "BATTERY COMPATIBILITY",
    "Power distribution": "POWER DISTRIBUTION",
    "Arm connectors": "ARM CONNECTORS",
    Assembly: "ASSEMBLY",
    Platform: "PLATFORM",
    "Mounting plate": "MOUNTING PLATE",
    "Rail system": "RAIL SYSTEM",
    Note: "NOTE",
  },
  de: {
    Frame: "RAHMEN",
    Motors: "MOTOREN",
    Propellers: "PROPELLER",
    Wheelbase: "RADSTAND",
    "Flight time": "FLUGZEIT",
    "Max takeoff weight": "MAX. ABHEBEGEWICHT",
    Payload: "NUTZLAST",
    Battery: "AKKU",
    Controller: "FLUGSTEUERUNG",
    GPS: "GPS",
    Telemetry: "TELEMETRIE",
    Firmware: "FIRMWARE",
    "Battery compatibility": "AKKUKOMPATIBILITÄT",
    "Power distribution": "STROMVERTEILUNG",
    "Arm connectors": "ARMVERBINDER",
    Assembly: "MONTAGE",
    Platform: "PLATTFORM",
    "Mounting plate": "MONTAGEPLATTE",
    "Rail system": "SCHIENENSYSTEM",
    Note: "HINWEIS",
  },
};

function Specifications() {
  const { language, t } = useLanguage();
  const localizedGroups = groups.map((group) => ({
    number: group.number,
    title: group.title[language],
    items: group.items.map(([label, value]) => [
      labels[language][label] || label,
      typeof value === "string" ? value : value[language],
    ]),
  }));
  return (
    <section className="specifications-section" id="specifications">
      <div className="container specifications-container">
        <header className="specifications-header">
          <div>
            <p className="eyebrow">05 / {t("specification")}</p>
            <h2>
              X650
              <br />
              {t("technical")}
              <br />
              <strong>{t("specification")}</strong>
            </h2>
            <p>{t("officialNote")}</p>
          </div>
          <dl>
            <div>
              <dt>{t("model")}</dt>
              <dd>X650</dd>
            </div>
            <div>
              <dt>{t("series")}</dt>
              <dd>DEVELOPMENT KIT</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>REFERENCE</dd>
            </div>
            <div>
              <dt>{t("year")}</dt>
              <dd>2026</dd>
            </div>
          </dl>
        </header>
        <div className="specification-list">
          {localizedGroups.map((group) => (
            <SpecificationGroup key={group.number} {...group} />
          ))}
        </div>
        <p className="specifications-disclaimer">
          {t("specificationDisclaimer")}
        </p>
        <footer className="specifications-footer">
          <span>HOLYBRO X650 DEVELOPMENT KIT</span>
          <span>{t("productTagline")}</span>
        </footer>
      </div>
    </section>
  );
}

export default Specifications;
