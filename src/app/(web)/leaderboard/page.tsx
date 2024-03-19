import React from 'react';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';

import styles from './styles.module.scss';

function LeaderBoard() {
  return (
    <section className={styles.leaderboard}>
      <CicadaLogo variant="small" />
      <Heading variant="h1">Leaderboard</Heading>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Team Name</th>
            <th>Team Members</th>
            <th>Stages Solved</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td>Team Name what if said </td>
              <td>
                <div>
                  <p>Member1 random prasad</p>
                  <p>Member2 singh</p>
                  <p>Member3 das</p>
                </div>
              </td>
              <td>10</td>
              <td>100</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.footer}></div>
    </section>
  );
}

export default LeaderBoard;
