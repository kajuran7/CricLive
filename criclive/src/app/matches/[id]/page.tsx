'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Activity, Calendar, MapPin, Users, Trophy, ArrowLeft } from 'lucide-react';

interface Match {
  _id: string;
  matchId: string;
  title: string;
  description: string;
  team1: string;
  team2: string;
  venue: string;
  date: string;
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
}

export default function MatchDetailsPage() {
  const params = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchMatch();
    }
  }, [params.id]);

  const fetchMatch = async () => {
    try {
      const response = await fetch(`/api/matches/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setMatch(data);
      } else {
        console.error('Match not found');
      }
    } catch (error) {
      console.error('Error fetching match:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getWinner = () => {
    if (!match?.currentScore || match.status !== 'completed') return null;
    
    if (match.currentScore.team1Score > match.currentScore.team2Score) {
      return match.team1;
    } else if (match.currentScore.team2Score > match.currentScore.team1Score) {
      return match.team2;
    }
    return 'Tie';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Match not found</h3>
          <p className="text-gray-600">The match you're looking for doesn't exist.</p>
          <a href="/" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Back to Matches
          </a>
        </div>
      </div>
    );
  }

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

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <a href="/" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Matches
        </a>
      </div>

      {/* Match Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Match Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{match.title}</h1>
              <p className="text-gray-600 text-lg">{match.description}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(match.status)}`}>
              {match.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(match.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-medium">{match.venue}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Teams</p>
                <p className="font-medium">{match.team1} vs {match.team2}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Score Section */}
        {match.currentScore && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Score</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team 1 Score */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">{match.team1}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-bold text-2xl">{match.currentScore.team1Score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wickets:</span>
                    <span className="font-medium">{match.currentScore.team1Wickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overs:</span>
                    <span className="font-medium">{match.currentScore.team1Overs}</span>
                  </div>
                </div>
              </div>

              {/* Team 2 Score */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">{match.team2}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-bold text-2xl">{match.currentScore.team2Score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wickets:</span>
                    <span className="font-medium">{match.currentScore.team2Wickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overs:</span>
                    <span className="font-medium">{match.currentScore.team2Overs}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Result */}
            {match.status === 'completed' && getWinner() && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-yellow-800">Match Result</p>
                    <p className="text-yellow-700">
                      {getWinner() === 'Tie' ? 'Match ended in a tie' : `${getWinner()} won the match`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Toss Information */}
        {match.tossWinner && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Toss Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Toss Winner</p>
                <p className="font-medium text-lg">{match.tossWinner}</p>
              </div>
              {match.tossDecision && (
                <div>
                  <p className="text-sm text-gray-500">Decision</p>
                  <p className="font-medium text-lg">{match.tossDecision}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Match Actions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Match Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Update Score
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              View Commentary
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Player Stats
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              Share Match
            </button>
          </div>
        </div>
      </div>

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
