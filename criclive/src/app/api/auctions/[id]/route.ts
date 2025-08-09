import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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
    
    const auction = await db
      .collection('auctions')
      .findOne({ _id: new ObjectId(params.id) });
    
    if (!auction) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    // Get bid history
    const bids = await db
      .collection('bids')
      .find({ auctionId: params.id })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({
      ...auction,
      bids
    });
  } catch (error) {
    console.error('Error fetching auction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auction' },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    
    // Update auction
    const result = await db
      .collection('auctions')
      .updateOne(
        { _id: new ObjectId(params.id) },
        { 
          $set: {
            ...body,
            updatedAt: new Date()
          }
        }
      );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Auction updated successfully' });
  } catch (error) {
    console.error('Error updating auction:', error);
    return NextResponse.json(
      { error: 'Failed to update auction' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    
    // Delete auction and associated bids
    const result = await db
      .collection('auctions')
      .deleteOne({ _id: new ObjectId(params.id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Auction not found' },
        { status: 404 }
      );
    }
    
    // Delete associated bids
    await db
      .collection('bids')
      .deleteMany({ auctionId: params.id });
    
    return NextResponse.json({ message: 'Auction deleted successfully' });
  } catch (error) {
    console.error('Error deleting auction:', error);
    return NextResponse.json(
      { error: 'Failed to delete auction' },
      { status: 500 }
    );
  }
}
