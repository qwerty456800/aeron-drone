import "../styles/hero.css";
import DroneViewer from "../three/DroneViewer.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero-section startup-target" id="top">
      <div className="hero-grid container">
        <div className="hero-copy startup-target">
          <p className="eyebrow">LIB TECH / PROFESSIONAL AERIAL SYSTEM</p>
          <p className="hero-index">
            SYS / 01 <span>X1-2026</span>
          </p>
          <h1 className="startup-target">
            <span>AERON</span>
            <strong>X1</strong>
          </h1>
          <p className="hero-product-type">
            {t("professional").toUpperCase()}
            <br />
            {t("aerialSystem").toUpperCase()}
          </p>
          <p className="hero-description">
            {t("precision")}
            <br />
            {t("perspective")}
          </p>
          <div className="hero-actions startup-target">
            <a className="button button--primary" href="#technology">
              {t("explore")} <span>↗</span>
            </a>
          </div>
        </div>

        <div
          className="hero-product startup-target"
          aria-label="AERON X1 product presentation"
        >
          <span className="product-coordinate product-coordinate--top">
            LAT 48.7758 / LON 9.1829
          </span>
          <span className="product-coordinate product-coordinate--side">
            X1 / 00:00:42
          </span>
          <div className="hud-crosshair hud-crosshair--top" />
          <div className="hud-crosshair hud-crosshair--bottom" />
          <div className="hud-orbit hud-orbit--large startup-line" />
          <div className="hud-orbit hud-orbit--small startup-line" />
          <DroneViewer />
          <div className="product-readouts startup-target">
            <span>CAM / READY</span>
            <span>GPS / LOCK</span>
            <span>SIGNAL / 98%</span>
            <span>X1 / ACTIVE</span>
          </div>
          <span className="product-label">AERON X1 / READY</span>
        </div>

        <aside
          className="telemetry startup-target"
          aria-label="Flight system telemetry"
        >
          <div className="telemetry__heading">
            <span>{t("flightSystem")}</span>
            <span className="telemetry__id">FS-X1 / 001</span>
            <span className="online">
              <i /> {t("systemOnline")}
            </span>
          </div>
          <div className="telemetry__battery telemetry__row">
            <div className="telemetry-row-main">
              <span className="telemetry__label">
                <b>01</b> Battery
              </span>
              <span className="telemetry-readout telemetry-readout--percent">
                <span
                  className="telemetry-number telemetry-value"
                  data-final="94"
                >
                  94
                </span>
                <span className="telemetry-unit">%</span>
              </span>
            </div>
            <div className="telemetry__bar">
              <i />
            </div>
          </div>
          <div className="telemetry__row telemetry-row-main">
            <span className="telemetry__label">
              <b>02</b> Altitude limit
            </span>
            <span className="telemetry-readout">
              <span
                className="telemetry-number telemetry-value"
                data-final="5000"
              >
                5000
              </span>
              <span className="telemetry-unit">M</span>
            </span>
          </div>
          <div className="telemetry__row telemetry-row-main">
            <span className="telemetry__label">
              <b>03</b> Control range
            </span>
            <span className="telemetry-readout">
              <span
                className="telemetry-number telemetry-value"
                data-final="15"
              >
                15
              </span>
              <span className="telemetry-unit">KM</span>
            </span>
          </div>
          <div className="telemetry__row telemetry-row-main">
            <span className="telemetry__label">
              <b>04</b> Max speed
            </span>
            <span className="telemetry-readout">
              <span
                className="telemetry-number telemetry-value"
                data-final="72"
              >
                72
              </span>
              <span className="telemetry-unit">KM/H</span>
            </span>
          </div>
          <div className="telemetry__footer">
            <span>LINK / ACTIVE</span>
            <span>
              <i /> READY
            </span>
          </div>
        </aside>

        <div
          className="hero-specs startup-target"
          aria-label="AERON X1 specifications"
        >
          <div>
            <span>Camera</span>
            <strong>
              <span className="spec-value" data-final="48">
                48
              </span>{" "}
              <small>MP</small>
            </strong>
          </div>
          <div>
            <span>Flight time</span>
            <strong>
              <span className="spec-value" data-final="42">
                42
              </span>{" "}
              <small>min</small>
            </strong>
          </div>
          <div>
            <span>Max speed</span>
            <strong>
              <span className="spec-value" data-final="72">
                72
              </span>{" "}
              <small>km/h</small>
            </strong>
          </div>
          <div>
            <span>Control range</span>
            <strong>
              <span className="spec-value" data-final="15">
                15
              </span>{" "}
              <small>km</small>
            </strong>
          </div>
          <span className="hero-specs__code">LIB TECH / FLIGHT DATA / 001</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
