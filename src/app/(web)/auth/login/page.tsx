'use client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import HoverButton from '@/app/_global_components/HoverButton';
import CustomInput from '@/app/_global_components/input';
import HoverLink from '@/app/_global_components/Link';
import Loader from '@/app/_global_components/Loading';

import { handleLogin } from '../../_api/login';
import styles from './styles.module.scss';

function Login({}) {
  const [teamId, setTeamId] = useState('');
  const [espektroId, setEspektroId] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setTeamId(sessionStorage.getItem('teamId') || '');
  }, []);

  if (loading) return <Loader text="Logging in..." />;
  return (
    <form className={styles.loginForm}>
      <div>
        <CustomInput
          defaultValue={teamId}
          placeholder="Team ID"
          onChange={(e) => setTeamId(e.target.value)}
        />
      </div>

      <div className={styles.buttonContainer}>
        <HoverLink className={styles.button} href="/auth/register">
          Create Team
        </HoverLink>
        <HoverButton
          className={styles.button}
          onClick={async () => {
            setLoading(true);
            const res = await handleLogin(teamId, espektroId);
            setLoading(false);
            notify(res);
            if (res.success) {
              router.push('/instructions');
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
