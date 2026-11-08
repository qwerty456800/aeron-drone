import "../styles/navbar.css";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

function Navbar() {
  const { t } = useLanguage();
  return (
    <header className="navbar startup-target">
      <div className="container navbar__inner">
        <a className="navbar__brand" href="#top">
          <img src="/libtec-logo-compact.svg" alt="LIBTEC" />
        </a>
        <nav className="navbar__nav" aria-label="Primary navigation">
          <a href="#products">{t("navProducts")}</a>
          <a href="#technology">{t("navTechnology")}</a>
          <a className="navbar__mobile-only" href="#closing">
            {t("navSupport")}
          </a>
        </nav>
        <div className="navbar__actions">
          <a className="navbar__desktop-only" href="#closing">
            {t("navSupport")}
          </a>
          <LanguageSwitcher />
          <span className="navbar__status">
            <i /> {t("online")}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
