import React from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import styles from './styles.module.scss';

function HoverLink({
  children,
  href,
  ...defaultButtonProps
}: {
  children: React.ReactNode;
  href: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classNames(
        styles.btn,
        styles.drawBorder,
        defaultButtonProps.className
      )}
    >
      <Link href={href}>{children}</Link>
    </button>
  );
}
export default HoverLink;
