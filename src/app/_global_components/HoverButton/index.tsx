import React from 'react';

import classnames from 'classnames';

import styles from './styles.module.scss';

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
      // className={`btn draw-border ${defaultButtonProps.className}`}
      className={classnames(
        styles.btn,
        styles.drawBorder,
        defaultButtonProps.className
      )}
      disabled={defaultButtonProps.disabled}
    >
      {children}
    </button>
  );
}
export default HoverButton;
