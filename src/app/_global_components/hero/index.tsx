import React from 'react';

import classnames from 'classnames';

import CicadaLogo from '../cicada';
import styles from './styles.module.scss';

function Hero() {
  return (
    <div className={classnames(styles.hero)}>
      <CicadaLogo className={styles.cicadalogo} />
      <h1 className={classnames(styles.heading, styles.foregroundText)}>
        cicada 3301
      </h1>
    </div>
  );
}

export default Hero;
