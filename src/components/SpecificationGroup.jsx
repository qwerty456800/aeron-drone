function SpecificationGroup({ number, title, items }) {
  return (
    <section className="specification-group">
      <div className="specification-group__label">
        <span>{number} /</span>
        <strong>{title}</strong>
      </div>
      <div className="specification-group__items">
        {items.map(([label, value]) => (
          <div className="specification-item" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SpecificationGroup;
