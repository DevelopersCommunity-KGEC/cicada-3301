import React from 'react';

import { Triangle } from 'react-loader-spinner';

import styles from './styles.module.scss';

function Loader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className={styles.wrapper}>
      <Triangle
        visible={true}
        height="50"
        width="50"
        color="#49b7f7"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p>{text}</p>
    </div>
  );
}

export default Loader;
