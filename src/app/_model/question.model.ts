import mongoose, { model, Model, Schema, Types } from 'mongoose';

interface IQuestion {
  totalPoints: number;
  stages: [
    {
      timeStamp: Date;
      id: Types.ObjectId;
    }
  ];
}
const questionsSchema = new Schema<IQuestion>(
  {
    totalPoints: {
      type: Number,
      required: true,
    },
    stages: [
      {
        timeStamp: {
          type: Date,
          default: Date.now,
          required: true,
        },
        stageId: {
          type: Schema.Types.ObjectId,
          ref: 'Stage',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const QuestionModel: Model<IQuestion> =
  mongoose.models.Question ?? model<IQuestion>('Question', questionsSchema);
export default QuestionModel;
