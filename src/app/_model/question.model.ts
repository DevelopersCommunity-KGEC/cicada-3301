import mongoose, { model, Model, Schema, Types } from 'mongoose';

interface IQuestion {
  totalPoints: number;
  stages: [Types.ObjectId];
}
const questionsSchema = new Schema<IQuestion>(
  {
    totalPoints: {
      type: Number,
      required: true,
    },
    stages: [
      {
        type: Types.ObjectId,
        ref: 'Stage',
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
