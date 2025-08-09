'use client';

import { useState, useEffect } from 'react';
import { Clock, Users, Hammer, ArrowLeft, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface Bid {
  id: string;
  amount: number;
  bidderName: string;
  timestamp: string;
}

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
  bids: Bid[];
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [auction, setAuction] = useState<AuctionItem | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    // TODO: Fetch auction details from API
    const mockAuction: AuctionItem = {
      id: params.id,
      title: 'Signed Cricket Bat by Local Legend',
      description: 'This exclusive cricket bat has been personally signed by our local cricket legend, John Smith. The bat was used during the championship match of 2023 and comes with a certificate of authenticity. Perfect for any cricket enthusiast or collector.',
      startingBid: 50,
      currentBid: 75,
      imageUrl: '/api/placeholder/600/400',
      endTime: '2024-01-15T20:00:00Z',
      bidCount: 8,
      status: 'live',
      bids: [
        { id: '1', amount: 75, bidderName: 'CricketFan2024', timestamp: '2024-01-15T19:45:00Z' },
        { id: '2', amount: 70, bidderName: 'BatCollector', timestamp: '2024-01-15T19:40:00Z' },
        { id: '3', amount: 65, bidderName: 'CricketFan2024', timestamp: '2024-01-15T19:35:00Z' },
        { id: '4', amount: 60, bidderName: 'SportsLover', timestamp: '2024-01-15T19:30:00Z' },
        { id: '5', amount: 55, bidderName: 'CricketFan2024', timestamp: '2024-01-15T19:25:00Z' },
      ]
    };
    
    setAuction(mockAuction);
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    if (!auction) return;

    const updateTimeRemaining = () => {
      const now = new Date();
      const end = new Date(auction.endTime);
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Auction Ended');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [auction]);

  const handlePlaceBid = () => {
    if (!bidAmount || !auction) return;
    
    const amount = parseFloat(bidAmount);
    if (amount <= auction.currentBid) {
      alert('Bid must be higher than current bid');
      return;
    }

    // TODO: Submit bid to API
    console.log('Placing bid:', amount);
    setBidAmount('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading auction...</p>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Auction not found</h2>
          <Link href="/auctions" className="text-blue-600 hover:underline">
            Back to auctions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/auctions" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Auctions
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Details */}
          <div>
            {/* Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{auction.description}</p>
            </div>
          </div>

          {/* Right Column - Bidding */}
          <div className="space-y-6">
            {/* Auction Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{auction.title}</h1>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Bid:</span>
                  <span className="text-3xl font-bold text-green-600">${auction.currentBid}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Starting Bid:</span>
                  <span className="text-lg text-gray-700">${auction.startingBid}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Bids:</span>
                  <span className="text-lg text-gray-700">{auction.bidCount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Remaining:</span>
                  <span className="text-lg font-semibold text-red-600">{timeRemaining}</span>
                </div>
              </div>
            </div>

            {/* Place Bid */}
            {auction.status === 'live' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Place Your Bid</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Bid Amount ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        id="bidAmount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min={auction.currentBid + 1}
                        step="1"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Minimum $${auction.currentBid + 1}`}
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePlaceBid}
                    disabled={!bidAmount || parseFloat(bidAmount) <= auction.currentBid}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            )}

            {/* Bid History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bid History</h3>
              
              <div className="space-y-3">
                {auction.bids.map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{bid.bidderName}</p>
                      <p className="text-sm text-gray-500">{formatTime(bid.timestamp)}</p>
                    </div>
                    <span className="text-lg font-semibold text-green-600">${bid.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
