import React from 'react';

import CicadaLogo from '@/app/_global_components/cicada';

import styles from './styles.module.scss';

function Instruction() {
  return (
    <div className={styles.instruction}>
      <CicadaLogo />
    </div>
  );
}

export default Instruction;
