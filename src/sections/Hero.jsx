import "../styles/hero.css";
import DroneViewer from "../three/DroneViewer.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero-section startup-target" id="top">
      <div className="hero-grid container">
        <div className="hero-copy startup-target">
          <p className="eyebrow">LIBTEC / {t("productCategory")}</p>
          <p className="hero-index">
            KIT / 01 <span>X650 / DEVELOPMENT</span>
          </p>
          <h1 className="startup-target">
            <span>X650</span>
          </h1>
          <p className="hero-product-type">{t("productFullName")}</p>
          <p className="hero-description">{t("productDescription")}</p>
          <div className="hero-actions startup-target">
            <a className="button button--primary" href="#technology">
              {t("explore")} <span>↗</span>
            </a>
          </div>
        </div>

        <div
          className="hero-product startup-target"
          aria-label="Holybro X650 Development Kit product presentation"
        >
          <span className="product-coordinate product-coordinate--top">
            LAT 48.7758 / LON 9.1829
          </span>
          <span className="product-coordinate product-coordinate--side">
            X650 / DEVELOPMENT KIT
          </span>
          <div className="hud-crosshair hud-crosshair--top" />
          <div className="hud-crosshair hud-crosshair--bottom" />
          <div className="hud-orbit hud-orbit--large startup-line" />
          <div className="hud-orbit hud-orbit--small startup-line" />
          <DroneViewer />
          <div className="product-readouts startup-target">
            <span>GPS / M10</span>
            <span>PIXHAWK / COMPATIBLE</span>
            <span>POWER / 6S LIPO</span>
            <span>X650 / PLATFORM</span>
          </div>
          <span className="product-label">X650 / READY</span>
        </div>

        <aside
          className="telemetry startup-target"
          aria-label="X650 flight system telemetry"
        >
          <div className="telemetry__heading">
            <span>{t("flightSystemTitle")}</span>
            <span className="telemetry__id">FS-X650 / 001</span>
            <span className="online">
              <i /> {t("systemOnline")}
            </span>
          </div>
          <div className="telemetry__battery telemetry__row">
            <div className="telemetry-row-main">
              <span className="telemetry__label">
                <b>01</b> {t("batteryCompatibility")}
              </span>
              <span className="telemetry-readout telemetry-readout--percent">
                <span
                  className="telemetry-number telemetry-value"
                  data-final="6"
                >
                  6
                </span>
                <span className="telemetry-unit">S LIPO</span>
              </span>
            </div>
            <div className="telemetry__bar">
              <i />
            </div>
          </div>
          <div className="telemetry__row telemetry-row-main">
            <span className="telemetry__label">
              <b>02</b> {t("takeoffWeight")}
            </span>
            <span className="telemetry-readout">
              <span className="telemetry-number">6.3</span>
              <span className="telemetry-unit">KG</span>
            </span>
          </div>
          <div className="telemetry__row telemetry-row-main">
            <span className="telemetry__label">
              <b>03</b> {t("payload")}
            </span>
            <span className="telemetry-readout">
              <span className="telemetry-number">3.1</span>
              <span className="telemetry-unit">KG</span>
            </span>
          </div>
          <div className="telemetry__row telemetry-row-main">
            <span className="telemetry__label">
              <b>04</b> {t("wheelbase")}
            </span>
            <span className="telemetry-readout">
              <span
                className="telemetry-number telemetry-value"
                data-final="650"
              >
                650
              </span>
              <span className="telemetry-unit">MM</span>
            </span>
          </div>
          <div className="telemetry__footer">
            <span>LINK / ACTIVE</span>
            <span>
              <i /> CONFIGURED
            </span>
          </div>
        </aside>

        <div
          className="hero-specs startup-target"
          aria-label="X650 specifications"
        >
          <div>
            <span>{t("wheelbase")}</span>
            <strong>
              <span className="spec-value" data-final="650">
                650
              </span>{" "}
              <small>mm</small>
            </strong>
          </div>
          <div>
            <span>{t("flightTimeX650")}</span>
            <strong>
              <span className="spec-value" data-final="30">
                30
              </span>{" "}
              <small>min*</small>
            </strong>
          </div>
          <div>
            <span>{t("takeoffWeight")}</span>
            <strong>
              <span>6.3</span> <small>kg*</small>
            </strong>
          </div>
          <div>
            <span>{t("payload")}</span>
            <strong>
              <span>3.1</span> <small>kg*</small>
            </strong>
          </div>
          <span className="hero-specs__code">LIBTEC / X650 DATA / 001</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
