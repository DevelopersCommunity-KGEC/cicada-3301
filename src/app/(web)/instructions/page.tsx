'use client';
import React, { useEffect, useState } from 'react';

import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';
import HoverButton from '@/app/_global_components/HoverButton';
import { GameStatus, ResponseToken } from '@/app/_utils/types';
import { useGSAP } from '@gsap/react';

import { getGameStatus } from '../_api/game';
import styles from './styles.module.scss';

const instructions = [
  'Welcome to Cicada 3301, a game of puzzles and riddles.',
  'You will be presented with some questions, each with a unique answer. There are multiple stages to the game.',
  'If you answer correctly, you will be awarded points and move on to the next question.',
  'Your team has total 10 tokens through out the game. After one wrong answer will cost you one token. If you lose all 10 tokens, Your game will end.',
  'Each stage will become progressively more difficult.',
  'Stage will have different point values based on difficulty.',
  'Leaderboard will be updated based on the points you earn.',
  'Usage of any AI or bots will result in disqualification.',
  'If you are ready, click the button below to begin.',
];
function Instruction() {
  const router = useRouter();
  const [fetchingAuthToken, setFetchingAuthToken] = useState(true);
  useGSAP(
    () => {
      gsap.from('#instruction', {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.25,
        ease: 'power3.inOut',
      });
    },
    {
      dependencies: [fetchingAuthToken],
    }
  );
  useEffect(() => {
    const authToken = sessionStorage.getItem(ResponseToken.AUTH_TOKEN);
    if (!authToken) {
      toast('Please login to continue', {
        type: 'warning',
      });
      router.push('/auth/login');
    }
    setFetchingAuthToken(false);
  }, []);
  if (fetchingAuthToken) {
    return null;
  }
  return (
    <div className={styles.instructionPage}>
      <div className={styles.logoContainer}>
        <CicadaLogo variant="small" />
      </div>
      <Heading variant="h1">Instructions</Heading>
      <div className={styles.instruction}>
        {instructions.map((instruction, index) => (
          <p id="instruction" key={index}>
            {instruction}
          </p>
        ))}
      </div>
      <div className={styles.footer}>
        <HoverButton
          onClick={async () => {
            const status = await getGameStatus();
            const { gameStatus } = status;
            if (gameStatus === GameStatus.STARTED) {
              router.push('/stage/1');
            } else if (gameStatus === -1) {
              toast('Failed to get game status', {
                type: 'error',
              });
              return;
            } else if (gameStatus === 1) {
            } else if (gameStatus === GameStatus.NOT_STARTED) {
              toast('Game not started yet', {
                type: 'warning',
              });
              return;
            } else if (gameStatus === GameStatus.ENDED) {
              toast('Game ended', {
                type: 'warning',
              });
              return;
            }
          }}
        >
          Play
        </HoverButton>
      </div>
    </div>
  );
}

export default Instruction;
