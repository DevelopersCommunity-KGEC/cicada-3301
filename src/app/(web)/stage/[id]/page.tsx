'use client';
import React, { useState } from 'react';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';
import HoverButton from '@/app/_global_components/HoverButton';

import styles from './styles.module.scss';

function Stage({ params }: { params: { id: string } }) {
  const [answer, setAnswer] = useState('');
  return (
    <section className={styles.stage}>
      <div className={styles.logoContainer}>
        <CicadaLogo className={styles.logo} variant="small" />
      </div>
      <Heading variant="h2" children={`Question 1`} />
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
        accusantium facere optio ad at in, quasi impedit tenetur voluptatum. Id
        aperiam voluptatibus molestiae inventore ipsam magnam excepturi dicta
        error totam perferendis, iste aut recusandae distinctio, ea iusto
        nesciunt amet est, asperiores sunt? Impedit incidunt quod, voluptatem
        expedita quasi quidem iure nisi? Quaerat repudiandae quos minima
        incidunt? Unde dolores mollitia animi consequuntur veritatis pariatur
        inventore quia provident neque quam consequatur soluta voluptatibus
        ratione dolore quasi, quod labore perspiciatis. Eaque, corrupti nemo!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
        accusantium facere optio ad at in, quasi impedit tenetur voluptatum. Id
        aperiam voluptatibus molestiae inventore ipsam magnam excepturi dicta
        error totam perferendis, iste aut recusandae distinctio, ea iusto
        nesciunt amet est, asperiores sunt? Impedit incidunt quod, voluptatem
        expedita quasi quidem iure nisi? Quaerat repudiandae quos minima
        incidunt? Unde dolores mollitia animi consequuntur veritatis pariatur
        inventore quia provident neque quam consequatur soluta voluptatibus
        ratione dolore quasi, quod labore perspiciatis. Eaque, corrupti
        nemo!Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
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
        <input
          value={answer}
          type="text"
          placeholder="Type your answer here..."
          className={styles.input}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
          required
          onChange={(e) => setAnswer(e.target.value)}
        />
        <HoverButton disabled={answer === ''}>Next</HoverButton>
      </div>
    </section>
  );
}

export default Stage;
