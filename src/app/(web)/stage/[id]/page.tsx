import React from 'react';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';
import HoverButton from '@/app/_global_components/HoverButton';

import styles from './styles.module.scss';

function Stage({ params }: { params: { id: string } }) {
  return (
    <section className={styles.stage}>
      <div className={styles.logoContainer}>
        <CicadaLogo className={styles.logo} />
      </div>
      <Heading variant="h1" children={`Question 1`} />
      <p className={styles.question}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
        accusantium facere optio ad at in, quasi impedit tenetur voluptatum. Id
        aperiam voluptatibus molestiae inventore ipsam magnam excepturi dicta
        error totam perferendis, iste aut recusandae distinctio, ea iusto
        nesciunt amet est, asperiores sunt? Impedit incidunt quod, voluptatem
        expedita quasi quidem iure nisi? Quaerat repudiandae quos minima
        incidunt? Unde dolores mollitia animi consequuntur veritatis pariatur
        inventore quia provident neque quam consequatur soluta voluptatibus
        ratione dolore quasi, quod labore perspiciatis. Eaque, corrupti nemo!
      </p>

      <div className={styles.footer}>
        <HoverButton>Next</HoverButton>
      </div>
    </section>
  );
}

export default Stage;
