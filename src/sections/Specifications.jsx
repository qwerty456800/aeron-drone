import SpecificationGroup from "../components/SpecificationGroup.jsx";
import "../styles/specifications.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const groups = [
  {
    number: "01",
    titleKey: "specImaging",
    items: [
      ["specCamera", { en: "48 MP", de: "48 MP" }],
      ["specVideo", { en: "4K", de: "4K" }],
      ["specFormat", { en: "RAW + JPEG", de: "RAW + JPEG" }],
      ["specStabilization", { en: "3-Axis", de: "3-Achs" }],
    ],
  },
  {
    number: "02",
    titleKey: "specFlight",
    items: [
      ["specMaxFlight", { en: "42 MIN", de: "42 MIN" }],
      ["specMaxSpeed", { en: "72 KM/H", de: "72 KM/H" }],
      ["specControlRange", { en: "15 KM", de: "15 KM" }],
      ["specPositioning", { en: "GPS + GNSS", de: "GPS + GNSS" }],
    ],
  },
  {
    number: "03",
    titleKey: "specAircraft",
    items: [
      ["specAirframe", { en: "Composite", de: "Verbundwerkstoff" }],
      [
        "specPropulsion",
        { en: "4-Motor Electric", de: "4-Motor-Elektroantrieb" },
      ],
      [
        "specFlightControl",
        { en: "Real-time stabilization", de: "Echtzeit-Stabilisierung" },
      ],
      [
        "specOperatingMode",
        { en: "Manual / Assisted / Auto", de: "Manuell / Assistiert / Auto" },
      ],
    ],
  },
  {
    number: "04",
    titleKey: "specPower",
    items: [
      ["specBattery", { en: "High-density Li-ion", de: "Hochdichte-Li-Ion" }],
      [
        "specPowerSystem",
        { en: "Intelligent management", de: "Intelligentes Management" },
      ],
      ["specCharging", { en: "USB-C / Dock", de: "USB-C / Dock" }],
      ["specBatteryStatus", { en: "Live telemetry", de: "Live-Telemetrie" }],
    ],
  },
  {
    number: "05",
    titleKey: "specSystem",
    items: [
      ["specTelemetry", { en: "Live", de: "Live" }],
      ["specNavigation", { en: "GPS / GNSS", de: "GPS / GNSS" }],
      ["specDataLink", { en: "Secure digital", de: "Sicher digital" }],
      ["specMissionPlanning", { en: "Supported", de: "Unterstützt" }],
    ],
  },
];

function Specifications() {
  const { language, t } = useLanguage();
  const localizedGroups = groups.map((group) => ({
    number: group.number,
    title: t(group.titleKey),
    items: group.items.map(([labelKey, value]) => [
      t(labelKey),
      value[language],
    ]),
  }));
  return (
    <section className="specifications-section" id="specifications">
      <div className="container specifications-container">
        <header className="specifications-header">
          <div>
            <p className="eyebrow">05 / {t("specification")}</p>
            <h2>
              X1
              <br />
              {t("technical")}
              <br />
              <strong>{t("specification")}</strong>
            </h2>
            <p>{t("architecture")}</p>
          </div>
          <dl>
            <div>
              <dt>{t("model")}</dt>
              <dd>AERON X1</dd>
            </div>
            <div>
              <dt>{t("series")}</dt>
              <dd>01</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{t("production")}</dd>
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
        <footer className="specifications-footer">
          <span>AERON X1 / {t("aerialSystem").toUpperCase()}</span>
          <span>{t("precision").toUpperCase()} / SERIES 01</span>
        </footer>
      </div>
    </section>
  );
}

export default Specifications;
