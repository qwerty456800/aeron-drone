/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  de: {
    navProducts: "Produkte",
    navTechnology: "Technologie",
    navSupport: "Support",
    online: "Online",
    secureAccess: "Sicherer Zugang",
    systemAccess: "System-Zugang",
    accessIntro: "Autorisierter Zugang zur",
    interface: "X650 Systemschnittstelle.",
    username: "Benutzername",
    password: "Passwort",
    enterSystem: "System betreten",
    statusOnline: "Systemstatus / Online",
    terminalReady: "Sicheres Terminal / Bereit",
    accessDenied: "Zugriff verweigert — Ungültige Zugangsdaten.",
    professional: "Professionelles",
    aerialSystem: "Luftsystem",
    precision: "Für Präzision entwickelt.",
    perspective: "Für neue Perspektiven konzipiert.",
    explore: "System entdecken",
    specifications: "Spezifikationen anzeigen",
    order: "X650 konfigurieren",
    flightSystem: "Flugsystem",
    systemOnline: "System online",
    battery: "Akku",
    altitude: "Höhenlimit",
    controlRange: "Steuerreichweite",
    maxSpeed: "Höchstgeschwindigkeit",
    camera: "Kamera",
    flightTime: "Flugzeit",
    linkActive: "Verbindung / Aktiv",
    ready: "Bereit",
    technology: "Technologie",
    aircraft: "Fluggerät",
    systems: "Flugsysteme",
    capabilities: "Einsatzbereiche",
    builtFor: "Für den Einsatz",
    mission: "entwickelt",
    oneAircraft: "Ein Fluggerät. Viele Einsatzumgebungen.",
    technical: "Technische",
    specification: "Spezifikation",
    architecture:
      "Flugzeugarchitektur, Bildgebung und Flugleistung als integrierte Plattform entwickelt.",
    model: "Modell",
    series: "Serie",
    production: "Produktion",
    year: "Jahr",
    closing: "Für den Flug",
    closingText:
      "Professionelle Luftsysteme für Präzision, Zuverlässigkeit und operative Kontrolle.",
    viewSpecs: "Spezifikationen anzeigen",
    support: "Produktsupport",
    inquiries: "Allgemeine Anfragen",
    operational: "Betriebsbereit",
    aircraftNav: "Fluggerät",
    systemsNav: "Systeme",
    orderSystem: "Bestellsystem",
    confirmation: "Bestätigung",
    orderRequest: "Bestellanfrage",
    received: "erhalten",
    reference: "Referenz:",
    registered: "Ihre Konfiguration wurde registriert.",
    representative:
      "Ein Vertreter von LIBTEC wird Sie mit Lieferinformationen kontaktieren.",
    close: "Schließen",
    orderConfiguration: "Bestellkonfiguration",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefon",
    country: "Land",
    selectCountry: "Land auswählen",
    quantity: "Menge",
    subtotal: "Zwischensumme",
    delivery: "Lieferung",
    calculated: "Wird nach Bestätigung berechnet",
    total: "Gesamt",
    submitOrder: "Bestellanfrage senden",
    baseConfiguration: "Basiskonfiguration",
    techPlatform: "INTEGRIERTE FLUGPLATTFORM",
    optical: "OPTISCHES SYSTEM",
    flightCore: "FLUGKERN",
    powerSystem: "ENERGIESYSTEM",
    transmission: "ÜBERTRAGUNG",
    precisionImaging: "PRÄZISIONSBILDGEBUNG",
    flightControl: "FLUGSTEUERUNG",
    extendedFlight: "VERLÄNGERTE FLUGDAUER",
    longRange: "LANGSTRECKENVERBINDUNG",
    fieldData: "FELDDATEN",
    opticalField: "OPTISCHES FELD",
    structuralScan: "STRUKTURSCAN",
    surveyGrid: "VERMESSUNGSRASTER",
    start: "START",
    end: "ENDE",
    productImaging: "BILDSYSTEM",
    productFlight: "FLUGZEIT",
    productRange: "STEUERREICHWEITE",
    productSpeed: "HÖCHSTGESCHWINDIGKEIT",
  },
  en: {
    navProducts: "Products",
    navTechnology: "Technology",
    navSupport: "Support",
    online: "Online",
    secureAccess: "Secure access",
    systemAccess: "System access",
    accessIntro: "Authorized access to the",
    interface: "X650 systems interface.",
    username: "Username",
    password: "Password",
    enterSystem: "Enter system",
    statusOnline: "System status / Online",
    terminalReady: "Secure terminal / Ready",
    accessDenied: "Access denied — Invalid credentials.",
    professional: "Professional",
    aerialSystem: "Aerial system",
    precision: "Engineered for precision.",
    perspective: "Built to extend your perspective.",
    explore: "Explore system",
    specifications: "View specifications",
    order: "Configure X650",
    flightSystem: "Flight system",
    systemOnline: "System online",
    battery: "Battery",
    altitude: "Altitude limit",
    controlRange: "Control range",
    maxSpeed: "Max speed",
    camera: "Camera",
    flightTime: "Flight time",
    linkActive: "Link / Active",
    ready: "Ready",
    technology: "Technology",
    aircraft: "Aircraft",
    systems: "Aircraft systems",
    capabilities: "Capabilities",
    builtFor: "Built for",
    mission: "the mission",
    oneAircraft: "One aircraft. Multiple operational environments.",
    technical: "Technical",
    specification: "specification",
    architecture:
      "Aircraft architecture, imaging systems and flight performance engineered as one integrated platform.",
    model: "Model",
    series: "Series",
    production: "Production",
    year: "Year",
    closing: "Engineered for flight.",
    closingText:
      "Professional aerial systems designed for precision, reliability and operational control.",
    viewSpecs: "View specifications",
    support: "Product support",
    inquiries: "General inquiries",
    operational: "Operational",
    aircraftNav: "Aircraft",
    systemsNav: "Systems",
    orderSystem: "Order system",
    confirmation: "confirmation",
    orderRequest: "Order request",
    received: "received",
    reference: "Reference:",
    registered: "Your configuration has been registered.",
    representative:
      "Review the X650 configuration before continuing with the manufacturer.",
    close: "Close",
    orderConfiguration: "Order configuration",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    country: "Country",
    selectCountry: "Select country",
    quantity: "Quantity",
    subtotal: "Subtotal",
    delivery: "Delivery",
    calculated: "Calculated after confirmation",
    total: "Total",
    submitOrder: "Submit order request",
    baseConfiguration: "Base configuration",
    techPlatform: "INTEGRATED FLIGHT PLATFORM",
    optical: "OPTICAL SYSTEM",
    flightCore: "FLIGHT CORE",
    powerSystem: "POWER SYSTEM",
    transmission: "TRANSMISSION",
    precisionImaging: "PRECISION IMAGING",
    flightControl: "FLIGHT CONTROL",
    extendedFlight: "EXTENDED FLIGHT",
    longRange: "LONG-RANGE LINK",
    fieldData: "FIELD DATA",
    opticalField: "OPTICAL FIELD",
    structuralScan: "STRUCTURAL SCAN",
    surveyGrid: "SURVEY GRID",
    start: "START",
    end: "END",
    productImaging: "IMAGING SYSTEM",
    productFlight: "FLIGHT TIME",
    productRange: "CONTROL RANGE",
    productSpeed: "MAX SPEED",
  },
};

Object.assign(translations.de, {
  specImaging: "BILDAUFNAHME",
  specFlight: "FLUG",
  specAircraft: "FLUGGERÄT",
  specPower: "ENERGIE",
  specSystem: "SYSTEM",
  specCamera: "KAMERA",
  specVideo: "VIDEO",
  specFormat: "FORMAT",
  specStabilization: "STABILISIERUNG",
  specMaxFlight: "MAX. FLUGZEIT",
  specMaxSpeed: "HÖCHSTGESCHWINDIGKEIT",
  specControlRange: "STEUERREICHWEITE",
  specPositioning: "POSITIONIERUNG",
  specAirframe: "FLUGWERK",
  specPropulsion: "ANTRIEB",
  specFlightControl: "FLUGSTEUERUNG",
  specOperatingMode: "BETRIEBSMODUS",
  specBattery: "AKKU",
  specPowerSystem: "ENERGIESYSTEM",
  specCharging: "LADEN",
  specBatteryStatus: "AKKUSTATUS",
  specTelemetry: "TELEMETRIE",
  specNavigation: "NAVIGATION",
  specDataLink: "DATENVERBINDUNG",
  specMissionPlanning: "EINSATZPLANUNG",
});
Object.assign(translations.en, {
  specImaging: "IMAGING",
  specFlight: "FLIGHT",
  specAircraft: "AIRCRAFT",
  specPower: "POWER",
  specSystem: "SYSTEM",
  specCamera: "CAMERA",
  specVideo: "VIDEO",
  specFormat: "FORMAT",
  specStabilization: "STABILIZATION",
  specMaxFlight: "MAX FLIGHT TIME",
  specMaxSpeed: "MAX SPEED",
  specControlRange: "CONTROL RANGE",
  specPositioning: "POSITIONING",
  specAirframe: "AIRFRAME",
  specPropulsion: "PROPULSION",
  specFlightControl: "FLIGHT CONTROL",
  specOperatingMode: "OPERATING MODE",
  specBattery: "BATTERY",
  specPowerSystem: "POWER SYSTEM",
  specCharging: "CHARGING",
  specBatteryStatus: "BATTERY STATUS",
  specTelemetry: "TELEMETRY",
  specNavigation: "NAVIGATION",
  specDataLink: "DATA LINK",
  specMissionPlanning: "MISSION PLANNING",
});

Object.assign(translations.de, {
  productName: "X650",
  productFullName: "Holybro X650 Development Kit",
  productCategory: "ENTWICKLUNGSPLATTFORM FÜR LUFTSYSTEME",
  productDescription:
    "Eine robuste Carbonfaser-Plattform für autonome Flugentwicklung, Integration und Nutzlasten.",
  productTagline: "ENTWICKELT FÜR INTEGRATION / X650",
  wheelbase: "RADSTAND",
  flightTimeX650: "FLUGZEIT",
  takeoffWeight: "MAX. ABHEBEGEWICHT",
  payload: "NUTZLAST",
  frame: "RAHMEN",
  flightController: "FLUGSTEUERUNG",
  gps: "GPS",
  batteryCompatibility: "AKKUKOMPATIBILITÄT",
  motorPropeller: "MOTOR / PROPELLER",
  flightSystemTitle: "FLUGSYSTEM",
  flightSystemDescription:
    "Pixhawk-kompatible Entwicklungsplattform mit M10 GPS, SiK-Telemetrie und integrierter Stromverteilung.",
  capabilityIntegration: "INTEGRATION",
  capabilityIntegrationDescription:
    "Geräumige Montageflächen und Schienensystem für Zubehör, Companion Computer und zusätzliche Nutzlasten.",
  capabilityPayload: "NUTZLAST",
  capabilityPayloadDescription:
    "Bis zu 3,1 kg Nutzlast mit 6S-10000-mAh-Akku-Konfiguration. Konfigurationsabhängiger Maximalwert.",
  capabilityDevelopment: "ENTWICKLUNG",
  capabilityDevelopmentDescription:
    "Vormontierte Antriebe, ESCs und LEDs mit steckbaren Anschlüssen für eine schnelle, lötfreie Montage.",
  fieldPlatform: "ENTWICKLUNGSPLATTFORM",
  technologyAirframe: "TRAGWERK",
  technologyCarbonPlatform: "CARBONFASER-PLATTFORM",
  technologyPowerSystem: "ENERGIESYSTEM",
  technologyPowerIntegration: "ENERGIE & INTEGRATION",
  technologyPayload: "NUTZLAST",
  technologyPayloadCapacity: "NUTZLASTKAPAZITÄT",
  technologyEndurance: "AUSDAUER",
  technologyFlightEndurance: "FLUGAUSDAUER",
  staticView: "STATISCHE ANSICHT",
  officialNote:
    "Werte gemäß Herstellerangaben; abhängig von Konfiguration und Nutzlast.",
  specificationDisclaimer:
    "* Maximales Abhebegewicht, Nutzlastkapazität und Flugausdauer hängen von Akkukonfiguration, Nutzlast, Betriebsbedingungen und Systemaufbau ab. Maximalwerte gelten nicht notwendigerweise gleichzeitig.",
});
Object.assign(translations.en, {
  productName: "X650",
  productFullName: "Holybro X650 Development Kit",
  productCategory: "PROFESSIONAL DEVELOPMENT PLATFORM",
  productDescription:
    "A robust carbon fiber platform for flight development, integration and payload applications.",
  productTagline: "ENGINEERED FOR INTEGRATION / X650",
  wheelbase: "WHEELBASE",
  flightTimeX650: "FLIGHT TIME",
  takeoffWeight: "MAX. TAKEOFF WEIGHT",
  payload: "PAYLOAD",
  frame: "FRAME",
  flightController: "FLIGHT CONTROLLER",
  gps: "GPS",
  batteryCompatibility: "BATTERY COMPATIBILITY",
  motorPropeller: "MOTOR / PROPELLER",
  flightSystemTitle: "FLIGHT SYSTEM",
  flightSystemDescription:
    "Pixhawk-compatible development platform with M10 GPS, SiK telemetry and integrated power distribution.",
  capabilityIntegration: "INTEGRATION",
  capabilityIntegrationDescription:
    "Spacious mounting surfaces and rail system for accessories, companion computers and additional payloads.",
  capabilityPayload: "PAYLOAD",
  capabilityPayloadDescription:
    "Up to 3.1 kg payload with the 6S 10000 mAh battery configuration. Configuration-dependent maximum.",
  capabilityDevelopment: "DEVELOPMENT",
  capabilityDevelopmentDescription:
    "Pre-installed motors, ESCs and LEDs with plug-in connections for fast, solder-free assembly.",
  fieldPlatform: "DEVELOPMENT PLATFORM",
  technologyAirframe: "AIRFRAME",
  technologyCarbonPlatform: "CARBON FIBER PLATFORM",
  technologyPowerSystem: "POWER SYSTEM",
  technologyPowerIntegration: "POWER & INTEGRATION",
  technologyPayload: "PAYLOAD",
  technologyPayloadCapacity: "PAYLOAD CAPACITY",
  technologyEndurance: "ENDURANCE",
  technologyFlightEndurance: "FLIGHT ENDURANCE",
  staticView: "STATIC VIEW",
  officialNote:
    "Values follow manufacturer specifications and depend on configuration and payload.",
  specificationDisclaimer:
    "* Maximum takeoff weight, payload capacity, and flight endurance depend on battery configuration, payload, operating conditions, and system setup. Maximum values do not necessarily apply simultaneously.",
});

Object.assign(translations.de, {
  systemStatus: "Systemstatus",
});
Object.assign(translations.en, {
  systemStatus: "System status",
});

Object.assign(translations.de, {
  orderCloseLabel: "Bestellkonfiguration schließen",
  orderConfigurationWord: "Konfiguration",
  orderFeatureWheelbase: "650 MM Radstand",
  orderFeatureBattery: "6S LiPo kompatibel",
  orderFeaturePayload: "Bis 3,1 KG Nutzlast*",
  countryOther: "Anderes Land",
  quantityDecrease: "Menge verringern",
  quantityIncrease: "Menge erhöhen",
  onRequest: "Auf Anfrage",
});
Object.assign(translations.en, {
  orderCloseLabel: "Close order configuration",
  orderConfigurationWord: "Configuration",
  orderFeatureWheelbase: "650 MM wheelbase",
  orderFeatureBattery: "6S LiPo compatible",
  orderFeaturePayload: "Up to 3.1 KG payload*",
  countryOther: "Other",
  quantityDecrease: "Decrease quantity",
  quantityIncrease: "Increase quantity",
  onRequest: "On request",
});

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const stored = localStorage.getItem("libtech_language");
      return ["de", "en"].includes(stored) ? stored : "en";
    } catch {
      return "en";
    }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
  }, [language]);
  const value = useMemo(
    () => ({
      language,
      setLanguage: (next) => {
        try {
          localStorage.setItem("libtech_language", next);
        } catch {
          /* storage unavailable */
        }
        setLanguage(next);
      },
      t: (key) => translations[language][key] ?? key,
    }),
    [language],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
