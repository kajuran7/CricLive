'use client';

import { useState, useEffect } from 'react';
import { Activity, Users, Trophy, Flag, Star, Target } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  country: string;
  captain: string;
  coach: string;
  ranking: number;
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
  winPercentage: number;
}

const sampleTeams: Team[] = [
  {
    id: '1',
    name: 'India',
    country: 'India',
    captain: 'Rohit Sharma',
    coach: 'Rahul Dravid',
    ranking: 1,
    totalMatches: 156,
    wins: 98,
    losses: 45,
    draws: 13,
    winPercentage: 62.8
  },
  {
    id: '2',
    name: 'Australia',
    country: 'Australia',
    captain: 'Pat Cummins',
    coach: 'Andrew McDonald',
    ranking: 2,
    totalMatches: 142,
    wins: 89,
    losses: 42,
    draws: 11,
    winPercentage: 62.7
  },
  {
    id: '3',
    name: 'England',
    country: 'England',
    captain: 'Ben Stokes',
    coach: 'Brendon McCullum',
    ranking: 3,
    totalMatches: 138,
    wins: 78,
    losses: 48,
    draws: 12,
    winPercentage: 56.5
  },
  {
    id: '4',
    name: 'Pakistan',
    country: 'Pakistan',
    captain: 'Babar Azam',
    coach: 'Grant Bradburn',
    ranking: 4,
    totalMatches: 125,
    wins: 65,
    losses: 52,
    draws: 8,
    winPercentage: 52.0
  },
  {
    id: '5',
    name: 'South Africa',
    country: 'South Africa',
    captain: 'Temba Bavuma',
    coach: 'Rob Walter',
    ranking: 5,
    totalMatches: 118,
    wins: 62,
    losses: 48,
    draws: 8,
    winPercentage: 52.5
  },
  {
    id: '6',
    name: 'New Zealand',
    country: 'New Zealand',
    captain: 'Tim Southee',
    coach: 'Gary Stead',
    ranking: 6,
    totalMatches: 112,
    wins: 58,
    losses: 46,
    draws: 8,
    winPercentage: 51.8
  }
];

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(sampleTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const getRankingColor = (ranking: number) => {
    if (ranking === 1) return 'bg-yellow-500 text-white';
    if (ranking === 2) return 'bg-gray-400 text-white';
    if (ranking === 3) return 'bg-orange-500 text-white';
    return 'bg-blue-500 text-white';
  };

  const getWinPercentageColor = (percentage: number) => {
    if (percentage >= 60) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">CricLive</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-green-600 font-medium">
                Matches
              </a>
              <a href="/players" className="text-gray-700 hover:text-green-600 font-medium">
                Players
              </a>
              <a href="/teams" className="text-green-600 font-medium">
                Teams
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">
                Stats
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Cricket Teams
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore international cricket teams, their rankings, statistics, and performance records.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Flag className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">{teams.length}</h3>
              <p className="text-gray-600">Total Teams</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">#1</h3>
              <p className="text-gray-600">Top Ranked</p>
            </div>
            <div className="text-center">
              <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">62.8%</h3>
              <p className="text-gray-600">Best Win Rate</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">156</h3>
              <p className="text-gray-600">Most Matches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Team Rankings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div 
                key={team.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedTeam(team)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                      <p className="text-gray-600">{team.country}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRankingColor(team.ranking)}`}>
                      #{team.ranking}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Captain:</span>
                      <span className="font-medium">{team.captain}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Coach:</span>
                      <span className="font-medium">{team.coach}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Matches:</span>
                      <span className="font-medium">{team.totalMatches}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Win Rate:</span>
                      <span className={`font-medium ${getWinPercentageColor(team.winPercentage)}`}>
                        {team.winPercentage}%
                      </span>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Record</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Wins:</span>
                          <span className="text-green-600 font-medium">{team.wins}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Losses:</span>
                          <span className="text-red-600 font-medium">{team.losses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Draws:</span>
                          <span className="text-gray-600 font-medium">{team.draws}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    View Team Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTeam.name}</h2>
                  <p className="text-gray-600">{selectedTeam.country}</p>
                </div>
                <button 
                  onClick={() => setSelectedTeam(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Team Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Captain:</span>
                      <span className="font-medium">{selectedTeam.captain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coach:</span>
                      <span className="font-medium">{selectedTeam.coach}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ranking:</span>
                      <span className="font-medium">#{selectedTeam.ranking}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Performance Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Matches:</span>
                      <span className="font-medium">{selectedTeam.totalMatches}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Win Rate:</span>
                      <span className={`font-medium ${getWinPercentageColor(selectedTeam.winPercentage)}`}>
                        {selectedTeam.winPercentage}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wins:</span>
                      <span className="text-green-600 font-medium">{selectedTeam.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Losses:</span>
                      <span className="text-red-600 font-medium">{selectedTeam.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Draws:</span>
                      <span className="text-gray-600 font-medium">{selectedTeam.draws}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  View Players
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Match History
                </button>
                <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Team Stats
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">CricLive</span>
              </div>
              <p className="text-gray-400">
                Your ultimate destination for live cricket updates and scores.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white">Live Matches</a></li>
                <li><a href="/players" className="hover:text-white">Player Profiles</a></li>
                <li><a href="/teams" className="hover:text-white">Team Rankings</a></li>
                <li><a href="#" className="hover:text-white">Player Stats</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Teams</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">India</a></li>
                <li><a href="#" className="hover:text-white">Australia</a></li>
                <li><a href="#" className="hover:text-white">England</a></li>
                <li><a href="#" className="hover:text-white">Pakistan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@criclive.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: Cricket Street, Sports City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CricLive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
