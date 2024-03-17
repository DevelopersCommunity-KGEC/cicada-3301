'use client';
import React from 'react';

import classnames from 'classnames';
import gsap from 'gsap';
import Image from 'next/image';

import CicadaBody from '@/asset/cicada-layers/body.png';
import CicadaLeftWing from '@/asset/cicada-layers/left.png';
import CicadaRightWing from '@/asset/cicada-layers/right.png';
import { useGSAP } from '@gsap/react';

import styles from './styles.module.scss';

function CicadaLogo({
  className,
  variant = 'default',
}: {
  className?: string;
  variant?: 'small' | 'default';
}) {
  const rotation = 2;
  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: {
        duration: 1,
        ease: 'power1.inOut',
      },
    });
    tl.fromTo(
      '#cicada-logo-left',
      {
        rotate: rotation,
      },
      {
        rotate: -rotation,
      },
      '<'
    ).fromTo(
      '#cicada-logo-right',
      {
        rotate: -rotation,
      },
      {
        rotate: rotation,
      },
      '<'
    );
  });
  return (
    <div
      className={classnames(
        styles.cicadalogo,
        variant === 'small' ? styles.small : styles.large,
        className
      )}
    >
      <div
        id="cicada-logo-left"
        className={classnames(styles.cicadalogo__left)}
      >
        <Image src={CicadaLeftWing.src} alt="left" fill />
      </div>
      <div
        id="cicada-logo-body"
        className={classnames(styles.cicadalogo__body)}
      >
        <Image src={CicadaBody.src} alt="left" fill />
      </div>
      <div
        id="cicada-logo-right"
        className={classnames(styles.cicadalogo__right)}
      >
        <Image src={CicadaRightWing.src} alt="left" fill />
      </div>
    </div>
  );
}

export default CicadaLogo;
