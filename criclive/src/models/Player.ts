import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
  playerId: string;
  name: string;
  team: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  battingStyle?: string;
  bowlingStyle?: string;
  dateOfBirth: Date;
  nationality: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    catches: number;
    stumpings: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PlayerSchema: Schema = new Schema({
  playerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['batsman', 'bowler', 'all-rounder', 'wicket-keeper'],
    required: true,
  },
  battingStyle: {
    type: String,
  },
  bowlingStyle: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  stats: {
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    catches: { type: Number, default: 0 },
    stumpings: { type: Number, default: 0 },
  },
}, {
  timestamps: true,
});

export default mongoose.models.Player || mongoose.model<IPlayer>('Player', PlayerSchema);
