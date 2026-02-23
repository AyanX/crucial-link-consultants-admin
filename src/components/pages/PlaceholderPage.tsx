import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => (
  <div className="page-content">
    <div className="placeholder-page">
      <h2 className="placeholder-page__title">{title}</h2>
      <p className="placeholder-page__sub">This section is under construction.</p>
    </div>
  </div>
);

export default PlaceholderPage;
