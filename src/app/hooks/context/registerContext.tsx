'use client';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface MemberType {
  memberId: number;
  name: string;
  espektroId: string;
}

interface CreateTeamContextProps {
  teamName: string;
  members: MemberType[] | [];
  setMembers: React.Dispatch<React.SetStateAction<MemberType[] | []>>;
  setTeamName: React.Dispatch<React.SetStateAction<string>>;
}

const CreateTeamContext = createContext<CreateTeamContextProps>({
  teamName: '',
  members: [],
  setMembers: () => {},
  setTeamName: () => {},
});

const useCreateTeamContext = () => {
  const context = useContext(CreateTeamContext);
  if (!context) {
    throw new Error(
      'useCreateTeamContext must be used within a CreateTeamContextProvider'
    );
  }
  return context;
};

const CreateTeamContextProvider = ({ children }: PropsWithChildren) => {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<MemberType[] | []>([]);
  return (
    <CreateTeamContext.Provider
      value={{
        members: members,
        teamName: teamName,
        setMembers: setMembers,
        setTeamName: setTeamName,
      }}
    >
      {children}
    </CreateTeamContext.Provider>
  );
};

export { CreateTeamContext, CreateTeamContextProvider, useCreateTeamContext };
