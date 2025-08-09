'use client';

import { useState, useEffect } from 'react';
import { Activity, Users, Trophy, Calendar, MapPin, User, Target, Shield } from 'lucide-react';

interface Player {
  _id: string;
  playerId: string;
  name: string;
  team: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  battingStyle?: string;
  bowlingStyle?: string;
  dateOfBirth: string;
  nationality: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    catches: number;
    stumpings: number;
  };
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'batsman':
        return 'bg-blue-500 text-white';
      case 'bowler':
        return 'bg-green-500 text-white';
      case 'all-rounder':
        return 'bg-purple-500 text-white';
      case 'wicket-keeper':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
              <a href="/players" className="text-green-600 font-medium">
                Players
              </a>
              <a href="/teams" className="text-gray-700 hover:text-green-600 font-medium">
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
            Player Profiles
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore comprehensive player statistics, career highlights, and performance data from cricket stars around the world.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <User className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">{players.length}</h3>
              <p className="text-gray-600">Total Players</p>
            </div>
            <div className="text-center">
              <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">
                {players.filter(p => p.role === 'batsman').length}
              </h3>
              <p className="text-gray-600">Batsmen</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">
                {players.filter(p => p.role === 'bowler').length}
              </h3>
              <p className="text-gray-600">Bowlers</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">
                {players.filter(p => p.role === 'all-rounder').length}
              </h3>
              <p className="text-gray-600">All-Rounders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Players Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Players</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading players...</p>
            </div>
          ) : players.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No players found</h3>
              <p className="text-gray-600">Check back later for player profiles!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map((player) => (
                <div key={player._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {player.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(player.role)}`}>
                        {player.role}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Team:</span>
                        <span className="font-medium">{player.team}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Nationality:</span>
                        <span className="font-medium">{player.nationality}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Born:</span>
                        <span className="font-medium">{formatDate(player.dateOfBirth)}</span>
                      </div>
                      
                      {player.battingStyle && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Batting:</span>
                          <span className="font-medium">{player.battingStyle}</span>
                        </div>
                      )}
                      
                      {player.bowlingStyle && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Bowling:</span>
                          <span className="font-medium">{player.bowlingStyle}</span>
                        </div>
                      )}
                      
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Career Stats</h4>
                        <div className="text-sm space-y-1">
                          <div>Matches: {player.stats.matches}</div>
                          <div>Runs: {player.stats.runs.toLocaleString()}</div>
                          <div>Wickets: {player.stats.wickets}</div>
                          <div>Catches: {player.stats.catches}</div>
                          {player.stats.stumpings > 0 && (
                            <div>Stumpings: {player.stats.stumpings}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
                <li><a href="#" className="hover:text-white">Team Rankings</a></li>
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
