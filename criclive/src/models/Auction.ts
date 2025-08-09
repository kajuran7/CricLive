import { ObjectId } from 'mongodb';

export interface Auction {
  _id?: ObjectId;
  title: string;
  description: string;
  startingBid: number;
  currentBid: number;
  imageUrl?: string;
  images?: string[];
  category?: string;
  endTime: Date;
  bidCount: number;
  status: 'upcoming' | 'live' | 'ended';
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAuctionRequest {
  title: string;
  description: string;
  startingBid: number;
  imageUrl?: string;
  images?: string[];
  category?: string;
  endTime: string;
  createdBy?: string;
}

export interface UpdateAuctionRequest {
  title?: string;
  description?: string;
  startingBid?: number;
  currentBid?: number;
  imageUrl?: string;
  images?: string[];
  category?: string;
  endTime?: string;
  status?: 'upcoming' | 'live' | 'ended';
}

export interface AuctionWithBids extends Auction {
  bids: Bid[];
}

export interface Bid {
  _id?: ObjectId;
  auctionId: string;
  amount: number;
  bidderName: string;
  bidderEmail?: string;
  createdAt: Date;
}

export interface CreateBidRequest {
  amount: number;
  bidderName: string;
  bidderEmail?: string;
}
