import React from 'react';

import classnames from 'classnames';

import CicadaLogo from '../cicada';
import HoverLink from '../Link';
import styles from './styles.module.scss';

function Hero() {
  return (
    <div className={classnames(styles.hero)}>
      <CicadaLogo className={styles.cicadalogo} />
      <h1 className={classnames(styles.heading, styles.foregroundText)}>
        CICADA 3301
      </h1>
      <div className={styles.buttonContainer}>
        <HoverLink href="/auth/login">Login</HoverLink>
        <HoverLink href="/auth/register">Create Team</HoverLink>
      </div>
    </div>
  );
}

export default Hero;
