import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();
    
    // Validate ObjectId
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid auction ID' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!body.amount || !body.bidderName) {
      return NextResponse.json(
        { error: 'Amount and bidder name are required' },
        { status: 400 }
      );
    }
    
    const amount = parseFloat(body.amount);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid bid amount' },
        { status: 400 }
      );
    }
    
    // Get auction details
    const auction = await db
      .collection('auctions')
      .findOne({ _id: new ObjectId(params.id) });
    
    if (!auction) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    // Check if auction is live
    if (auction.status !== 'live') {
      return NextResponse.json(
        { error: 'Auction is not live' },
        { status: 400 }
      );
    }
    
    // Check if auction has ended
    const now = new Date();
    const endTime = new Date(auction.endTime);
    if (now > endTime) {
      return NextResponse.json(
        { error: 'Auction has ended' },
        { status: 400 }
      );
    }
    
    // Check if bid is higher than current bid
    if (amount <= auction.currentBid) {
      return NextResponse.json(
        { error: 'Bid must be higher than current bid' },
        { status: 400 }
      );
    }
    
    // Create bid
    const bid = {
      auctionId: params.id,
      amount,
      bidderName: body.bidderName,
      bidderEmail: body.bidderEmail || '',
      createdAt: new Date()
    };
    
    const result = await db.collection('bids').insertOne(bid);
    
    // Update auction with new current bid
    await db
      .collection('auctions')
      .updateOne(
        { _id: new ObjectId(params.id) },
        { 
          $set: {
            currentBid: amount,
            bidCount: auction.bidCount + 1,
            updatedAt: new Date()
          }
        }
      );
    
    return NextResponse.json({
      id: result.insertedId,
      ...bid
    }, { status: 201 });
  } catch (error) {
    console.error('Error placing bid:', error);
    return NextResponse.json(
      { error: 'Failed to place bid' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    
    // Validate ObjectId
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid auction ID' },
        { status: 400 }
      );
    }
    
    // Get bids for auction
    const bids = await db
      .collection('bids')
      .find({ auctionId: params.id })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ bids });
  } catch (error) {
    console.error('Error fetching bids:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bids' },
      { status: 500 }
    );
  }
}
