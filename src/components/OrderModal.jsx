import { useEffect, useRef, useState } from "react";
import "../styles/order-modal.css";

const UNIT_PRICE = 1299;

function OrderModal({ open, onClose }) {
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
  const total = UNIT_PRICE * quantity;
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
          aria-label="Close order configuration"
        >
          Close ×
        </button>
        {submitted ? (
          <div className="order-confirmation">
            <p className="order-modal__eyebrow">Order system / confirmation</p>
            <h2>
              Order request
              <br />
              <strong>received</strong>
            </h2>
            <p className="order-confirmation__product">
              AERON X1
              <br />
              Series 01
            </p>
            <p>
              Reference: <strong>AX1-2026-001</strong>
            </p>
            <p>
              Your configuration has been registered.
              <br />
              An AERON representative will contact you with delivery
              information.
            </p>
            <button
              className="order-modal__primary"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="order-modal__grid">
            <div className="order-modal__product">
              <p className="order-modal__eyebrow">LIB TECH / Order system</p>
              <span className="order-modal__series">X1 / SERIES 01</span>
              <h2 id="order-modal-title">
                AERON
                <br />
                <strong>X1</strong>
              </h2>
              <p className="order-modal__subtitle">
                PROFESSIONAL AERIAL SYSTEM
              </p>
              <div className="order-modal__base">
                <span>Base configuration</span>
                <strong>€1,299</strong>
              </div>
              <ul>
                <li>48 MP camera</li>
                <li>42 MIN flight</li>
                <li>15 KM range</li>
                <li>72 KM/H max speed</li>
              </ul>
            </div>
            <form
              className="order-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <p className="order-modal__eyebrow">Order configuration</p>
              <div className="order-form__fields">
                <label>
                  First name
                  <input ref={firstField} required name="firstName" />
                </label>
                <label>
                  Last name
                  <input required name="lastName" />
                </label>
                <label>
                  Email
                  <input required name="email" type="email" />
                </label>
                <label>
                  Phone
                  <input required name="phone" type="tel" />
                </label>
                <label className="order-form__full">
                  Country
                  <select required name="country" defaultValue="">
                    <option value="" disabled>
                      Select country
                    </option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Italy</option>
                    <option>Spain</option>
                    <option>Netherlands</option>
                    <option>Austria</option>
                    <option>Switzerland</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Japan</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <div className="order-quantity">
                <span>Quantity</span>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <strong>{quantity}</strong>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="order-summary">
                <div>
                  <span>Subtotal</span>
                  <strong>€{total.toLocaleString("de-DE")}</strong>
                </div>
                <div>
                  <span>Delivery</span>
                  <small>Calculated after confirmation</small>
                </div>
                <div>
                  <span>Total</span>
                  <strong>€{total.toLocaleString("de-DE")}</strong>
                </div>
              </div>
              <button className="order-modal__primary" type="submit">
                Submit order request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderModal;
