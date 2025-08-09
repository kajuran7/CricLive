'use client';

import { useState, useEffect } from 'react';
import { Users, Hammer, DollarSign, TrendingUp, Calendar, Settings } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalPlayers: number;
  totalAuctions: number;
  totalRevenue: number;
  activeAuctions: number;
}

interface RecentPlayer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  registeredAt: string;
  status: 'pending' | 'confirmed' | 'paid';
}

interface RecentAuction {
  id: string;
  title: string;
  currentBid: number;
  bidCount: number;
  status: 'upcoming' | 'live' | 'ended';
  endTime: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPlayers: 0,
    totalAuctions: 0,
    totalRevenue: 0,
    activeAuctions: 0
  });
  const [recentPlayers, setRecentPlayers] = useState<RecentPlayer[]>([]);
  const [recentAuctions, setRecentAuctions] = useState<RecentAuction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch dashboard data from API
    const mockStats: DashboardStats = {
      totalPlayers: 45,
      totalAuctions: 12,
      totalRevenue: 1250,
      activeAuctions: 3
    };

    const mockRecentPlayers: RecentPlayer[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        registeredAt: '2024-01-15T10:30:00Z',
        status: 'paid'
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@email.com',
        registeredAt: '2024-01-15T09:15:00Z',
        status: 'confirmed'
      },
      {
        id: '3',
        firstName: 'Mike',
        lastName: 'Davis',
        email: 'mike.davis@email.com',
        registeredAt: '2024-01-15T08:45:00Z',
        status: 'pending'
      }
    ];

    const mockRecentAuctions: RecentAuction[] = [
      {
        id: '1',
        title: 'Signed Cricket Bat',
        currentBid: 75,
        bidCount: 8,
        status: 'live',
        endTime: '2024-01-15T20:00:00Z'
      },
      {
        id: '2',
        title: 'VIP Tournament Pass',
        currentBid: 100,
        bidCount: 3,
        status: 'upcoming',
        endTime: '2024-01-20T18:00:00Z'
      },
      {
        id: '3',
        title: 'Team Jersey',
        currentBid: 45,
        bidCount: 5,
        status: 'ended',
        endTime: '2024-01-14T22:00:00Z'
      }
    ];

    setStats(mockStats);
    setRecentPlayers(mockRecentPlayers);
    setRecentAuctions(mockRecentAuctions);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'live': return 'text-red-600 bg-red-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ended': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage tournament registrations and auctions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Players</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPlayers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Hammer className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Auctions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAuctions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeAuctions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            href="/admin/players"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Manage Players</h3>
                <p className="text-gray-600">View and manage tournament registrations</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/auctions"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <Hammer className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Manage Auctions</h3>
                <p className="text-gray-600">Create and manage auction items</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/settings"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-gray-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                <p className="text-gray-600">Configure tournament settings</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Players */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Registrations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {player.firstName} {player.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{player.email}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(player.registeredAt)} at {formatTime(player.registeredAt)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                      {player.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link 
                  href="/admin/players"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all players →
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Auctions */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Auctions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentAuctions.map((auction) => (
                  <div key={auction.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{auction.title}</p>
                      <p className="text-sm text-gray-600">
                        ${auction.currentBid} • {auction.bidCount} bids
                      </p>
                      <p className="text-xs text-gray-500">
                        Ends: {formatDate(auction.endTime)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(auction.status)}`}>
                      {auction.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link 
                  href="/admin/auctions"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all auctions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
