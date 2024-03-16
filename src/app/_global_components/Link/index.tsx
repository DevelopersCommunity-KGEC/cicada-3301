import './styles.scss';

import React from 'react';

import Link from 'next/link';

function HoverLink({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <button className={`btn draw-border ${className}`}>
      <Link href={href}>{children}</Link>
    </button>
  );
}
export default HoverLink;
