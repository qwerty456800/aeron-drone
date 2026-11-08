import { useEffect, useRef, useState } from "react";
import "../styles/order-modal.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const COUNTRY_CODES = ["DE", "AT", "CH", "FR", "IT", "ES", "NL", "GB", "US", "JP"];

function OrderModal({ open, onClose }) {
  const { language, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const firstField = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  let countryName = (code) => code;
  try {
    const names = new Intl.DisplayNames([language], { type: "region" });
    countryName = (code) => names.of(code);
  } catch {
    /* Intl.DisplayNames unsupported */
  }
  return (
    <div
      className="order-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="order-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        <button
          className="order-modal__close"
          type="button"
          onClick={onClose}
          aria-label={t("orderCloseLabel")}
        >
          {t("close")} ×
        </button>
        {submitted ? (
          <div className="order-confirmation">
            <p className="order-modal__eyebrow">
              LIBTEC / {t("confirmation")}
            </p>
            <h2>
              {t("orderConfigurationWord")}
              <br />
              <strong>{t("received")}</strong>
            </h2>
            <p className="order-confirmation__product">
              Holybro X650 Development Kit
              <br />
              X650
            </p>
            <p>
              {t("reference")} <strong>X650-2026-001</strong>
            </p>
            <p>
              {t("registered")}
              <br />
              {t("representative")}
            </p>
            <button
              className="order-modal__primary"
              type="button"
              onClick={onClose}
            >
              {t("close")}
            </button>
          </div>
        ) : (
          <div className="order-modal__grid">
            <div className="order-modal__product">
              <p className="order-modal__eyebrow">LIBTEC / X650 system</p>
              <span className="order-modal__series">
                HOLYBRO / DEVELOPMENT KIT
              </span>
              <h2 id="order-modal-title">
                <strong>X650</strong>
              </h2>
              <p className="order-modal__subtitle">
                HOLYBRO X650 DEVELOPMENT KIT
              </p>
              <div className="order-modal__base">
                <span>{t("baseConfiguration")}</span>
                <strong>6S / PIXHAWK</strong>
              </div>
              <ul>
                <li>{t("orderFeatureWheelbase")}</li>
                <li>{t("orderFeatureBattery")}</li>
                <li>Pixhawk 6C / 6X</li>
                <li>{t("orderFeaturePayload")}</li>
              </ul>
            </div>
            <form
              className="order-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <p className="order-modal__eyebrow">{t("orderConfiguration")}</p>
              <div className="order-form__fields">
                <label>
                  {t("firstName")}
                  <input ref={firstField} required name="firstName" />
                </label>
                <label>
                  {t("lastName")}
                  <input required name="lastName" />
                </label>
                <label>
                  {t("email")}
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </label>
                <label>
                  {t("phone")}
                  <input required name="phone" type="tel" autoComplete="tel" />
                </label>
                <label className="order-form__full">
                  {t("country")}
                  <select required name="country" defaultValue="">
                    <option value="" disabled>
                      {t("selectCountry")}
                    </option>
                    {COUNTRY_CODES.map((code) => (
                      <option key={code} value={code}>
                        {countryName(code)}
                      </option>
                    ))}
                    <option value="OTHER">{t("countryOther")}</option>
                  </select>
                </label>
              </div>
              <div className="order-quantity">
                <span>{t("quantity")}</span>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    aria-label={t("quantityDecrease")}
                  >
                    −
                  </button>
                  <strong>{quantity}</strong>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    aria-label={t("quantityIncrease")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="order-summary">
                <div>
                  <span>{t("subtotal")}</span>
                  <strong>{t("onRequest")}</strong>
                </div>
                <div>
                  <span>{t("delivery")}</span>
                  <small>{t("calculated")}</small>
                </div>
                <div>
                  <span>{t("total")}</span>
                  <strong>{t("onRequest")}</strong>
                </div>
              </div>
              <button className="order-modal__primary" type="submit">
                {t("submitOrder")}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderModal;
