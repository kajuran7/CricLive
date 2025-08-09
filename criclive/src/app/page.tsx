'use client';

import { useState, useEffect } from 'react';
import { Trophy, Users, Hammer, Calendar, MapPin, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

interface TournamentStats {
  totalPlayers: number;
  totalAuctions: number;
  totalRevenue: number;
  activeAuctions: number;
}

export default function Home() {
  const [stats, setStats] = useState<TournamentStats>({
    totalPlayers: 0,
    totalAuctions: 0,
    totalRevenue: 0,
    activeAuctions: 0
  });

  useEffect(() => {
    // TODO: Fetch tournament stats from API
    const mockStats: TournamentStats = {
      totalPlayers: 45,
      totalAuctions: 12,
      totalRevenue: 1250,
      activeAuctions: 3
    };
    setStats(mockStats);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Cricket Tournament Management
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our comprehensive cricket tournament platform featuring player registration, 
            live auctions, and real-time management tools for the ultimate cricket experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/register"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Register for Tournament
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/auctions"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center"
            >
              View Live Auctions
              <Hammer className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalPlayers}+</h3>
              <p className="text-gray-600">Registered Players</p>
            </div>
            <div className="text-center">
              <Hammer className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalAuctions}</h3>
              <p className="text-gray-600">Auction Items</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">1</h3>
              <p className="text-gray-600">Tournament</p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">{stats.activeAuctions}</h3>
              <p className="text-gray-600">Live Auctions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tournament Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a successful cricket tournament in one comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Player Registration */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Player Registration</h3>
              <p className="text-gray-600 mb-4">
                Simple and secure player registration with mobile-friendly forms, 
                automatic confirmations, and centralized data management.
              </p>
              <Link 
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
              >
                Register Now
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Live Auctions */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Hammer className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Live Auctions</h3>
              <p className="text-gray-600 mb-4">
                Real-time bidding platform with sub-500ms latency for fair and 
                engaging auctions of cricket memorabilia and experiences.
              </p>
              <Link 
                href="/auctions"
                className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
              >
                View Auctions
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Admin Dashboard */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive management tools for tournament organizers including 
                player rosters, auction management, and real-time analytics.
              </p>
              <Link 
                href="/admin"
                className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
              >
                Access Dashboard
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Tournament</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Join our premier cricket tournament featuring players of all skill levels. 
                  Whether you're a beginner or an expert, there's a place for you in our 
                  competitive yet friendly environment.
                </p>
                <p>
                  Our tournament includes multiple divisions, professional umpiring, 
                  and exciting prizes for winners. Plus, participate in our live auctions 
                  to bid on exclusive cricket memorabilia and experiences.
                </p>
                <div className="flex items-center space-x-4 mt-6">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="font-medium">Professional Umpiring</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="font-medium">Multiple Divisions</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tournament Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration Fee:</span>
                  <span className="font-medium">$25.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tournament Start:</span>
                  <span className="font-medium">February 1, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">6 Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Venue:</span>
                  <span className="font-medium">Local Cricket Ground</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">T20</span>
                </div>
              </div>
              <Link 
                href="/register"
                className="block w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss out on this exciting cricket tournament. Register now and be part of 
            the action both on and off the field!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/register"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Register for Tournament
            </Link>
            <Link 
              href="/auctions"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Browse Auctions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold">CricLive</span>
              </div>
              <p className="text-gray-400">
                Comprehensive cricket tournament management and live auction platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-white">Register</Link></li>
                <li><Link href="/auctions" className="hover:text-white">Auctions</Link></li>
                <li><Link href="/admin" className="hover:text-white">Admin</Link></li>
                <li><Link href="/matches" className="hover:text-white">Matches</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tournament</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/register" className="hover:text-white">Player Registration</Link></li>
                <li><Link href="/auctions" className="hover:text-white">Live Auctions</Link></li>
                <li><Link href="/admin" className="hover:text-white">Tournament Management</Link></li>
                <li><Link href="#" className="hover:text-white">Rules & Regulations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@criclive.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: Cricket Ground, Sports City</li>
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
