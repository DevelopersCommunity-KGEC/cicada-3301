'use client';
import React from 'react';

import gsap from 'gsap';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';
import HoverButton from '@/app/_global_components/HoverButton';
import { useGSAP } from '@gsap/react';

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
  useGSAP(() => {
    gsap.from('#instruction', {
      y: 25,
      opacity: 0,
      duration: 0.5,
      stagger: 0.25,
      ease: 'power3.inOut',
    });
  });
  return (
    <div className={styles.instructionPage}>
      <div className={styles.logoContainer}>
        <CicadaLogo />
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
        <HoverButton>Play</HoverButton>
      </div>
    </div>
  );
}

export default Instruction;
