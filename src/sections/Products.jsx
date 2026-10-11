import { useState } from "react";
import ProductDrone from "../three/ProductDrone.jsx";
import OrderModal from "../components/OrderModal.jsx";
import "../styles/products.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const specs = [
  ["48", "MP", "productImaging"],
  ["42", "MIN", "productFlight"],
  ["15", "KM", "productRange"],
  ["72", "KM/H", "productSpeed"],
];

function Products() {
  const { t } = useLanguage();
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <section className="products-section" id="products">
      <div className="products-poster container">
        <div className="product-copy">
          <p className="product-eyebrow">03 / {t("aircraft")}</p>
          <h2>
            AERON
            <br />
            <strong>X1</strong>
          </h2>
          <p className="product-type">
            {t("professional").toUpperCase()}
            <br />
            {t("aerialSystem").toUpperCase()}
          </p>
          <p className="product-description">
            {t("precision")}
            <br />
            {t("perspective")}
          </p>
          <span className="product-id">X1-2026 / SERIES 01</span>
          <div className="product-actions">
            <button
              className="product-order"
              type="button"
              onClick={() => setOrderOpen(true)}
            >
              {t("order")}
            </button>
            <a href="#technology">{t("explore")}</a>
          </div>
          <div className="product-purchase-meta">
            <span>Available / 2026</span>
            <span>System / X1</span>
            <span>Status / Ready</span>
          </div>
        </div>
        <ProductDrone />
        <div className="product-specs" aria-label="AERON X1 specifications">
          {specs.map(([value, unit, labelKey]) => (
            <div className="product-spec" key={labelKey}>
              <strong>
                <span>{value}</span>
                <small>{unit}</small>
              </strong>
              <span>{t(labelKey)}</span>
            </div>
          ))}
        </div>
        <div className="product-price">€1,299</div>
      </div>
      <OrderModal
        key={orderOpen ? "open" : "closed"}
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
      />
    </section>
  );
}

export default Products;
