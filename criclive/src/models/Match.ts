import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
  matchId: string;
  title: string;
  description: string;
  team1: string;
  team2: string;
  venue: string;
  date: Date;
  status: 'upcoming' | 'live' | 'completed';
  currentScore?: {
    team1Score: number;
    team1Wickets: number;
    team1Overs: number;
    team2Score: number;
    team2Wickets: number;
    team2Overs: number;
  };
  tossWinner?: string;
  tossDecision?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MatchSchema: Schema = new Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed'],
    default: 'upcoming',
  },
  currentScore: {
    team1Score: { type: Number, default: 0 },
    team1Wickets: { type: Number, default: 0 },
    team1Overs: { type: Number, default: 0 },
    team2Score: { type: Number, default: 0 },
    team2Wickets: { type: Number, default: 0 },
    team2Overs: { type: Number, default: 0 },
  },
  tossWinner: {
    type: String,
  },
  tossDecision: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Match || mongoose.model<IMatch>('Match', MatchSchema);
