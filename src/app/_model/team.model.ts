import mongoose, { model, Schema, Types } from 'mongoose';

import { TeamProps } from '../_validation_schema/api/user/userValidation';

interface IMember {
  name: string;
  espektroId: string;
  college: string;
}
interface IStage {
  stageId: Types.ObjectId;
  timeStamp: Date;
}
interface ITeam extends TeamProps {
  teamId: string;
  members?: Types.Array<IMember>;
  totalPointScored?: number;
  noOfStagesAttempted?: number;
  stages?: Types.Array<IStage>;
}
const teamSchema = new Schema<ITeam>(
  {
    teamId: {
      type: String,
      required: true,
      unique: true,
    },
    teamName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    teamLeader: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    teamLeaderEspektroId: {
      type: String,
      required: true,
      min: 5,
    },
    college: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    noOfMembers: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
    members: [
      {
        name: {
          type: String,
          required: true,
        },
        espektroId: {
          type: String,
          required: true,
        },
        college: {
          type: String,
          required: true,
        },
      },
    ],
    totalPointScored: {
      type: Number,
      default: 0,
    },
    noOfStagesAttempted: {
      type: Number,
      default: 0,
    },
    stages: [
      {
        stageId: {
          type: Types.ObjectId,
          required: true,
        },
        timeStamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TeamModel = mongoose.model.Team || model<ITeam>('Team', teamSchema);
export default TeamModel;
