'use client';
import React from 'react';

import classnames from 'classnames';

import styles from './styles.module.scss';

function Heading({
  variant = 'h1',
  className,
  children,
}: {
  variant: 'h1' | 'h2';
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      {variant === 'h1' && (
        <h1 className={classnames(styles.heading, styles.heading1, className)}>
          {children || 'Heading 1'}
        </h1>
      )}
      {variant === 'h2' && (
        <h2 className={classnames(styles.heading, styles.heading2, className)}>
          {children || 'Heading 2'}
        </h2>
      )}
    </>
  );
}

export default Heading;
