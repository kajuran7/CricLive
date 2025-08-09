import connectDB from '../lib/mongodb';
import Match from '../models/Match';
import Player from '../models/Player';

const sampleMatches = [
  {
    matchId: 'MATCH001',
    title: 'India vs Australia - 1st Test',
    description: 'First test match of the series between India and Australia',
    team1: 'India',
    team2: 'Australia',
    venue: 'Melbourne Cricket Ground',
    date: new Date('2024-12-25'),
    status: 'upcoming',
  },
  {
    matchId: 'MATCH002',
    title: 'England vs Pakistan - T20 Series',
    description: 'Exciting T20 series between England and Pakistan',
    team1: 'England',
    team2: 'Pakistan',
    venue: 'Lord\'s Cricket Ground',
    date: new Date('2024-12-20'),
    status: 'live',
    currentScore: {
      team1Score: 156,
      team1Wickets: 4,
      team1Overs: 18.2,
      team2Score: 0,
      team2Wickets: 0,
      team2Overs: 0,
    },
  },
  {
    matchId: 'MATCH003',
    title: 'South Africa vs New Zealand - ODI',
    description: 'One Day International between South Africa and New Zealand',
    team1: 'South Africa',
    team2: 'New Zealand',
    venue: 'Newlands Cricket Ground',
    date: new Date('2024-12-15'),
    status: 'completed',
    currentScore: {
      team1Score: 285,
      team1Wickets: 8,
      team1Overs: 50,
      team2Score: 278,
      team2Wickets: 10,
      team2Overs: 48.3,
    },
  },
];

const samplePlayers = [
  {
    playerId: 'PLAYER001',
    name: 'Virat Kohli',
    team: 'India',
    role: 'batsman',
    battingStyle: 'Right-handed',
    dateOfBirth: new Date('1988-11-05'),
    nationality: 'Indian',
    stats: {
      matches: 254,
      runs: 12169,
      wickets: 0,
      catches: 106,
      stumpings: 0,
    },
  },
  {
    playerId: 'PLAYER002',
    name: 'Steve Smith',
    team: 'Australia',
    role: 'batsman',
    battingStyle: 'Right-handed',
    dateOfBirth: new Date('1989-06-02'),
    nationality: 'Australian',
    stats: {
      matches: 187,
      runs: 9320,
      wickets: 19,
      catches: 169,
      stumpings: 0,
    },
  },
  {
    playerId: 'PLAYER003',
    name: 'Ben Stokes',
    team: 'England',
    role: 'all-rounder',
    battingStyle: 'Left-handed',
    bowlingStyle: 'Right-arm fast-medium',
    dateOfBirth: new Date('1991-06-04'),
    nationality: 'English',
    stats: {
      matches: 197,
      runs: 6123,
      wickets: 197,
      catches: 108,
      stumpings: 0,
    },
  },
];

async function seedData() {
  try {
    await connectDB();
    
    // Clear existing data
    await Match.deleteMany({});
    await Player.deleteMany({});
    
    // Insert sample matches
    const matches = await Match.insertMany(sampleMatches);
    console.log(`✅ Inserted ${matches.length} matches`);
    
    // Insert sample players
    const players = await Player.insertMany(samplePlayers);
    console.log(`✅ Inserted ${players.length} players`);
    
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedData();
