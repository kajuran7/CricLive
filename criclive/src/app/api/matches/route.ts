import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Match from '@/models/Match';

export async function GET() {
  try {
    await connectDB();
    const matches = await Match.find({}).sort({ date: -1 });
    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const match = new Match(body);
    await match.save();
    
    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json(
      { error: 'Failed to create match' },
      { status: 500 }
    );
  }
}
