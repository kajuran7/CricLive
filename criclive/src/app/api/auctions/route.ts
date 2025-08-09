import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Build filter
    const filter: any = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    // Get auctions with pagination
    const auctions = await db
      .collection('auctions')
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    // Get total count for pagination
    const total = await db.collection('auctions').countDocuments(filter);
    
    return NextResponse.json({
      auctions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auctions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'startingBid', 'endTime'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Create auction item
    const auction = {
      ...body,
      currentBid: body.startingBid,
      bidCount: 0,
      status: 'upcoming',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('auctions').insertOne(auction);
    
    return NextResponse.json({
      id: result.insertedId,
      ...auction
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating auction:', error);
    return NextResponse.json(
      { error: 'Failed to create auction' },
      { status: 500 }
    );
  }
}
