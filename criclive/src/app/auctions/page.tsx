'use client';

import { useState, useEffect } from 'react';
import { Clock, Users, Hammer, Eye } from 'lucide-react';

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  startingBid: number;
  currentBid: number;
  imageUrl: string;
  endTime: string;
  bidCount: number;
  status: 'upcoming' | 'live' | 'ended';
}

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch auctions from API
    const mockAuctions: AuctionItem[] = [
      {
        id: '1',
        title: 'Signed Cricket Bat',
        description: 'Autographed bat by local cricket legend',
        startingBid: 50,
        currentBid: 75,
        imageUrl: '/api/placeholder/300/200',
        endTime: '2024-01-15T20:00:00Z',
        bidCount: 8,
        status: 'live'
      },
      {
        id: '2',
        title: 'VIP Tournament Pass',
        description: 'Exclusive access to all tournament matches',
        startingBid: 100,
        currentBid: 100,
        imageUrl: '/api/placeholder/300/200',
        endTime: '2024-01-20T18:00:00Z',
        bidCount: 3,
        status: 'upcoming'
      }
    ];
    
    setAuctions(mockAuctions);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-red-600 bg-red-100';
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ended': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeRemaining = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading auctions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Auctions</h1>
          <p className="text-gray-600">Bid on exclusive cricket memorabilia and experiences</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            All Auctions
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-50">
            Live Now
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-50">
            Upcoming
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border hover:bg-gray-50">
            Ended
          </button>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={auction.imageUrl}
                  alt={auction.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(auction.status)}`}>
                  {auction.status.toUpperCase()}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{auction.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{auction.description}</p>

                {/* Bid Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Current Bid:</span>
                    <span className="text-lg font-bold text-green-600">${auction.currentBid}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Starting Bid:</span>
                    <span className="text-sm text-gray-700">${auction.startingBid}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{auction.bidCount} bids</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimeRemaining(auction.endTime)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Place Bid
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {auctions.length === 0 && (
          <div className="text-center py-12">
            <Hammer className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No auctions available</h3>
            <p className="text-gray-600">Check back later for new auction items.</p>
          </div>
        )}
      </div>
    </div>
  );
}
