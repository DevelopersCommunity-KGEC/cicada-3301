'use client';
import React from 'react';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';

import styles from './styles.module.scss';

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.authLayout}>
      <CicadaLogo className={styles.logo} />
      <div className={styles.formContainer}>
        <Heading variant="h1">Create Team</Heading>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
