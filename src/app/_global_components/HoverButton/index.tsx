import './styles.scss';

import React from 'react';

function HoverButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <button className={`btn draw-border ${className}`}>{children}</button>;
}
export default HoverButton;
