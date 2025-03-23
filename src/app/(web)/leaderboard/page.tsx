'use client';
import React, { useEffect, useState } from 'react';

import CicadaLogo from '@/app/_global_components/cicada';
import Heading from '@/app/_global_components/heading';

import { handleLeaderboard } from '../_api/leaderboard';
import styles from './styles.module.scss';

function LeaderBoard() {
  const [teamsData, setTeamsData] = useState<
    Array<{
      _id: string;
      teamName: string;
      totalPointScored: number;
      noOfStagesAttempted: number;
      members: Array<{ name: string }>;
    }>
  >([]);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await handleLeaderboard();
      const teams = response.teams;
      setTeamsData(teams);
    };
    fetchLeaderboard();
    const timeout = setInterval(() => {
      fetchLeaderboard();
    }, 60000);
    return () => clearInterval(timeout);
  }, []);
  console.log(teamsData);
  return (
    <section className={styles.leaderboard}>
      <CicadaLogo variant="small" />
      <Heading variant="h1">Leaderboard</Heading>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Team Members</th>
            <th>Attempted</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {teamsData &&
            teamsData.map((team, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>{team.teamName}</td>
                <td>
                  <div>
                    {team.members.map((member, index) => (
                      <p key={index}>{member.name}</p>
                    ))}
                  </div>
                </td>
                <td>{team.noOfStagesAttempted}</td>
                <td>{team.totalPointScored}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={styles.footer}></div>
    </section>
  );
}

export default LeaderBoard;
