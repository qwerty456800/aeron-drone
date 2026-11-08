import { useState } from "react";
import ProductDrone from "../three/ProductDrone.jsx";
import OrderModal from "../components/OrderModal.jsx";
import "../styles/products.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const specs = [
  ["650", "MM", "wheelbase"],
  ["30", "MIN*", "flightTimeX650"],
  ["6300", "G*", "takeoffWeight"],
  ["3.1", "KG*", "payload"],
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
            <strong>X650</strong>
          </h2>
          <p className="product-type">{t("productFullName")}</p>
          <p className="product-description">{t("productDescription")}</p>
          <span className="product-id">X650 / DEVELOPMENT KIT</span>
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
            <span>HOLYBRO / X650</span>
            <span>6S LIPO / XT60</span>
            <span>{t("officialNote")}</span>
          </div>
        </div>
        <ProductDrone />
        <div className="product-specs" aria-label="X650 specifications">
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
        <div className="product-price">KIT / X650</div>
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
