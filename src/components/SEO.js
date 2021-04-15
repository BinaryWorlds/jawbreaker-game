import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SEO = () => (
  <HelmetProvider>
    <Helmet>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
      />
    </Helmet>
  </HelmetProvider>
);
export default SEO;
