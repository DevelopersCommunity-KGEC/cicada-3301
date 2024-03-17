import mongoose, { model, Model, Schema, Types } from 'mongoose';

interface IMember {
  name: string;
  espektroId: string;
  college: string;
}
interface IStage {
  stageId: Types.ObjectId;
  timeStamp: Date;
}
interface ITeam {
  teamName: string;
  teamId: string;
  members?: Types.Array<IMember>;
  totalPointScored: number;
  noOfStagesAttempted: number;
  stages: Types.Array<IStage>;
  lastCompletedStage?: Types.ObjectId;
  totalTokens: number;
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
      },
    ],
    lastCompletedStage: {
      type: Types.ObjectId,
      default: null,
    },
    totalTokens: {
      type: Number,
      default: 10,
    },
    totalPointScored: {
      type: Number,
      default: 0,
    },
    noOfStagesAttempted: {
      type: Number,
      default: 0,
    },
    stages: {
      type: [
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
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TeamModel: Model<ITeam> =
  mongoose.models.Team ?? model<ITeam>('Team', teamSchema);
export default TeamModel;
