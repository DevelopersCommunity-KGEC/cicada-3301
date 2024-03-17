'use client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';
import HoverButton from '@/app/_global_components/HoverButton';
import { StatusCode } from '@/app/_utils/types';

import { getQuestionById, submitAnswer } from '../../_api/question';
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
      const { data, message, status, success } = await getQuestionById(
        +params.id
      );

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
          autoClose: 2000,
        });
        router.push('/auth/login');
      } else {
        toast('Something went wrong', {
          type: 'error',
          autoClose: 2000,
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
        <HoverButton
          disabled={answer === '' || !stage}
          onClick={async () => {
            if (stage) {
              const { success, message, status, data } = await submitAnswer(
                answer,
                stage._id
              );

              if (
                success &&
                status === StatusCode.OK &&
                data &&
                'nextStageId' in data
              ) {
                toast('Correct answer !', {
                  type: 'success',
                  autoClose: 2000,
                });

                // if the current stage was the last stage then redirect to results page
                if (data.nextStageId === -1) {
                  router.push('/results');
                } else {
                  // if the next stage exists then redirect to the next stage
                  router.push(
                    `/stage/${data ? data.nextStageId : stage.stageId + 1}`
                  );
                }
              } else if (status === StatusCode.UNAUTHORIZED) {
                toast('Unauthorized access', {
                  type: 'error',
                  autoClose: 2000,
                });
                router.push('/auth/login');
              } else if (status === StatusCode.BAD_REQUEST) {
                // only triggers when wrong answer
                if (data) {
                  // if there is tokens left meaning game = false (game over for player)
                  if (data.totalTokens <= 0) {
                    router.push('/results');
                  }

                  // if there is tokens left meaning game = true
                  // then player can continue playing, instead of redirecting to home ( not game over for player)

                  toast(
                    <div>
                      <p>{data.message}</p>
                      {data.totalTokens > 0 ? (
                        <p>Tokens left: {data.totalTokens}</p>
                      ) : (
                        <p>No Tokens left</p>
                      )}
                    </div>,
                    {
                      type: 'error',
                      autoClose: 2000,
                    }
                  );
                }
                // handles other bad request cases
                else {
                  toast(message, {
                    type: 'error',
                    autoClose: 2000,
                  });
                }
              } else {
                // handles other status codes accept the above three
                toast(message, {
                  type: 'error',
                  autoClose: 2000,
                });
              }
            }
          }}
        >
          Next
        </HoverButton>
      </div>
    </section>
  );
}

export default Stage;
