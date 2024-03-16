import './styles.scss';

import React from 'react';

function HoverButton({
  children,
  ...defaultButtonProps
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...defaultButtonProps}
      type={defaultButtonProps.type || 'button'}
      className={`btn draw-border ${defaultButtonProps.className}`}
      disabled={defaultButtonProps.disabled}
    >
      {children}
    </button>
  );
}
export default HoverButton;
