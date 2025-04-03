import React from "react";
import "./ResumenPsicologo.css";

const ResumenPsicologo = ({ resumenData }) => {
  return (
    <section className="resumen-grid">
      {resumenData.map((item, index) => (
        <div
          key={index}
          className="resumen-card"
          style={{ backgroundColor: item.bgColor }}
        >
          <div className="resumen-header">
            <div className="resumen-icon">{item.icon}</div>
            <h4 className="resumen-title">{item.title}</h4>
          </div>
          <div className="resumen-stats">
            {item.stats.map((stat, i) => (
              <div key={i} className="stat-item">
                {stat.icon}
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ResumenPsicologo;
