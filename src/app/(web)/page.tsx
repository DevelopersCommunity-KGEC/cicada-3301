import React from 'react';

import Hero from '../_global_components/hero';

function Home() {
  return (
    <div
      style={{
        width: '100dvw',
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgb(7 13 14)',
      }}
    >
      <Hero />
    </div>
  );
}

export default Home;
