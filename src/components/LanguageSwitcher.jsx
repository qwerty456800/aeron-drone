import { useLanguage } from "../i18n/LanguageContext.jsx";

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switcher" aria-label="Language selection">
      <button
        type="button"
        className={language === "de" ? "is-active" : ""}
        onClick={() => setLanguage("de")}
      >
        DE
      </button>
      <span>/</span>
      <button
        type="button"
        className={language === "en" ? "is-active" : ""}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
