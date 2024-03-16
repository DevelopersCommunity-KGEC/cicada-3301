'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import HoverButton from '@/app/_global_components/HoverButton';
import CustomInput from '@/app/_global_components/input';
import { useCreateTeamContext } from '@/app/hooks/context/registerContext';

import { handleRegisterTeam } from '../../_api/register';
import styles from './styles.module.scss';

function Register() {
  const [memberIds, setMemberIds] = useState([1]);
  const { setTeamName, teamName, members } = useCreateTeamContext();
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
  const teamNotify = ({ teamId }: { teamId: string }) =>
    toast(
      <div>
        <p className={styles.teamid__toast}>
          Your Team ID: <span>{teamId}</span>
        </p>
      </div>,
      {
        type: 'info',
        autoClose: 35000,
      }
    );

  return (
    <form className={styles.registerForm} onSubmit={() => {}}>
      <div className={styles.teamNameContainer}>
        <CustomInput
          placeholder="Team Name"
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      {memberIds.map((memberId) => (
        <MemberForm key={memberId} memberId={memberId} />
      ))}

      <div className={styles.buttonContainer}>
        <HoverButton
          className={styles.button}
          onClick={() => {
            if (memberIds.length >= 3) return;
            setMemberIds((prev) => [...prev, prev.slice(-1)[0] + 1]);
          }}
          disabled={memberIds.length >= 3}
        >
          Add Member
        </HoverButton>
        <HoverButton
          className={styles.button}
          onClick={async () => {
            // register team
            const formatedMembers = members.map((member) => {
              return {
                name: member.name,
                espektroId: member.espektroId,
                // TODO if college is necessary, add it here
              };
            });
            const response = await handleRegisterTeam(
              teamName,
              formatedMembers
            );
            notify(response);
            teamNotify({ teamId: response.teamId ?? '' });
            if (response.success) {
              router.push('/instructions');
            }
          }}
        >
          Create
        </HoverButton>
      </div>
    </form>
  );
}

function MemberForm({ memberId }: { memberId: number }) {
  const { setMembers } = useCreateTeamContext();
  return (
    <div className={styles.memberForm}>
      <p>Member {memberId}</p>
      <CustomInput
        placeholder="Name"
        onChange={(e) => {
          setMembers((prev) => {
            // if memberid doesn't exist, create a new member
            const memberExists = prev.some(
              (member) => member.memberId === memberId
            );
            if (memberExists) {
              return prev.map((member) => {
                if (member.memberId === memberId) {
                  return { ...member, name: e.target.value };
                }
                return member;
              });
            } else {
              return [
                ...prev,
                {
                  memberId,
                  name: e.target.value,
                  espektroId: '',
                },
              ];
            }
          });
        }}
      />
      <CustomInput
        placeholder="Espektro ID"
        onChange={(e) => {
          setMembers((prev) => {
            // if memberid doesn't exist, create a new member
            const memberExists = prev.some(
              (member) => member.memberId === memberId
            );
            if (memberExists) {
              return prev.map((member) => {
                if (member.memberId === memberId) {
                  return {
                    ...member,
                    espektroId: e.target.value.toUpperCase(),
                  };
                }
                return member;
              });
            } else {
              return [
                ...prev,
                {
                  memberId,
                  name: '',
                  espektroId: e.target.value.toUpperCase(),
                },
              ];
            }
          });
        }}
      />
    </div>
  );
}

export default Register;
