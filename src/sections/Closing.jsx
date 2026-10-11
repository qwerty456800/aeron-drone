import Footer from "../components/Footer.jsx";
import "../styles/closing.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function Closing() {
  const { t } = useLanguage();
  return (
    <>
      <section className="closing-section" id="closing">
        <div className="container closing-container">
          <div className="closing-copy">
            <p className="eyebrow">06 / LIB TECH</p>
            <h2>
              {t("closing")
                .split(" ")
                .map((word, index) => (
                  <span key={word}>
                    {index > 0 && <br />}
                    {word}{" "}
                  </span>
                ))}
            </h2>
            <p>{t("closingText")}</p>
            <span className="closing-id">AERON X1 / SERIES 01 / 2026</span>
            <div className="closing-actions">
              <a href="#specifications">{t("viewSpecs")}</a>
            </div>
          </div>
          <div className="closing-support">
            <div>
              <span>{t("support")}</span>
              <a href="mailto:support@libtech.systems">
                support@libtech.systems
              </a>
            </div>
            <div>
              <span>{t("inquiries")}</span>
              <a href="mailto:contact@libtech.systems">
                contact@libtech.systems
              </a>
            </div>
            <div>
              <span>System status</span>
              <strong>{t("operational")}</strong>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Closing;
