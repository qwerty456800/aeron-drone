import { useLanguage } from "../i18n/LanguageContext.jsx";

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <span className="site-footer__brand">LIB TECH</span>
          <span>X1 / {t("aerialSystem").toUpperCase()}</span>
          <span>© 2026 LIB TECH</span>
        </div>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          <a href="#products">{t("aircraftNav")}</a>
          <a href="#technology">{t("systemsNav")}</a>
          <a href="#capabilities">{t("capabilities")}</a>
          <a href="#specifications">{t("specifications")}</a>
        </nav>
        <div className="site-footer__status">
          <span>System / Online</span>
          <span>Series / 01</span>
          <span>Build / 2026</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
