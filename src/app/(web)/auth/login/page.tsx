'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import HoverButton from '@/app/_global_components/HoverButton';
import CustomInput from '@/app/_global_components/input';
import HoverLink from '@/app/_global_components/Link';

import { handleLogin } from '../../_api/login';
import styles from './styles.module.scss';

function Login({}) {
  const [teamId, setTeamId] = useState('');
  const [espektroId, setEspektroId] = useState('');
  const router = useRouter();
  const notify = ({
    success,
    message,
  }: {
    success: boolean;
    message: string;
  }) =>
    toast(message, {
      type: success ? 'success' : 'error',
    });

  return (
    <form className={styles.loginForm} onSubmit={() => {}}>
      <div>
        <CustomInput
          placeholder="Team ID"
          onChange={(e) => setTeamId(e.target.value)}
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
          onClick={async () => {
            const res = await handleLogin(teamId, espektroId);
            notify(res);
            if (res.success) {
              router.push('/');
            }
          }}
        >
          Login
        </HoverButton>
      </div>
    </form>
  );
}

export default Login;
