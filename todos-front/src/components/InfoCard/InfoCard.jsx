import React from 'react'

const InfoCard = ({ title, data }) => {
  return (
    <div className="info-card__section">
      <h3 className="info-card__section-title">{title}</h3>
      <div className="info-card__grid">
        {Object.entries(data).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) return null;
          
          const label = key.charAt(0).toUpperCase() + 
                        key.slice(1).replace(/([A-Z])/g, ' $1');
          
          return (
            <div 
              key={key} 
              className={`info-card__item `}
            >
              <span className="info-card__label">{label}</span>
              <span className="info-card__value">
                {value || 'Not provided'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoCard;