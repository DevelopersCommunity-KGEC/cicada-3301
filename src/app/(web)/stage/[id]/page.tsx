'use client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';
import HoverButton from '@/app/_global_components/HoverButton';
import { StatusCode } from '@/app/_utils/types';

import { getQuestionById } from '../../_api/question';
import styles from './styles.module.scss';

interface StageProps {
  question: string;
  stageId: number;
  _id: string;
}
interface ResponseProps {
  stage: StageProps;
}
function Stage({ params }: { params: { id: string } }) {
  const [answer, setAnswer] = useState('');
  const [stage, setStage] = useState<StageProps | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchQuestion = async () => {
      const { data, message, status, success } = await getQuestionById(1);

      setLoading(false);
      if (success && status === 200) {
        const formattedData = data as ResponseProps;
        setStage({
          question: formattedData.stage.question,
          stageId: formattedData.stage.stageId,
          _id: formattedData.stage._id,
        });
      } else if (status === StatusCode.UNAUTHORIZED) {
        toast('Unauthorized access', {
          type: 'error',
          autoClose: 3000,
        });
        router.push('/auth/login');
      } else {
        toast('Something went wrong', {
          type: 'error',
          autoClose: 3000,
        });
      }
    };
    fetchQuestion();
  }, [params.id]);
  return (
    <section className={styles.stage}>
      <div className={styles.logoContainer}>
        <CicadaLogo className={styles.logo} variant="small" />
      </div>

      {!stage || loading ? (
        <div className={styles.loading}>loading...</div>
      ) : (
        <>
          <Heading variant="h2" children={`Question ${stage.stageId}`} />

          <p className={styles.question}>{stage.question}</p>
        </>
      )}

      <div className={styles.footer}>
        <input
          value={answer}
          type="text"
          placeholder="Type your answer here..."
          className={styles.input}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
          required
          onChange={(e) => setAnswer(e.target.value)}
        />
        <HoverButton disabled={answer === '' || !stage}>Next</HoverButton>
      </div>
    </section>
  );
}

export default Stage;
