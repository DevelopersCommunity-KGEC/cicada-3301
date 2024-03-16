'use client';
import React, { useState } from 'react';

import { toast } from 'react-toastify';

import HoverButton from '@/app/_global_components/HoverButton';
import CustomInput from '@/app/_global_components/input';
import HoverLink from '@/app/_global_components/Link';

import styles from './styles.module.scss';

function Login() {
  const [teamName, setTeamName] = useState('');
  const [espektroId, setEspektroId] = useState('');
  const notify = () =>
    toast(
      <div>
        <p>Team ID: {teamName}</p>
        <p>Espektro ID: {espektroId}</p>
      </div>
    );

  return (
    <form className={styles.loginForm} onSubmit={() => {}}>
      <div>
        <CustomInput
          placeholder="Team ID"
          onChange={(e) => setTeamName(e.target.value)}
        />
        <CustomInput
          placeholder="Espektro ID"
          onChange={(e) => setEspektroId(e.target.value.toUpperCase())}
        />
      </div>

      <div className={styles.buttonContainer}>
        <HoverLink className={styles.button} href="/auth/register">
          Create Team
        </HoverLink>
        <HoverButton
          className={styles.button}
          onClick={() => {
            notify();
            console.log({
              teamName,
              espektroId,
            });
          }}
        >
          Login
        </HoverButton>
      </div>
    </form>
  );
}

export default Login;
