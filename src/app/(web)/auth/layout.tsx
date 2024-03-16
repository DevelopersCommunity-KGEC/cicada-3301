'use client';
import React from 'react';

import { usePathname } from 'next/navigation';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';

import styles from './styles.module.scss';

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className={styles.authLayout}>
      <CicadaLogo className={styles.logo} />
      <div className={styles.formContainer}>
        <Heading variant="h1">
          {pathname === '/auth/login' ? 'Login' : 'Create Team'}
        </Heading>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
