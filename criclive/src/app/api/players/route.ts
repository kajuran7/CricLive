import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Player from '@/models/Player';

export async function GET() {
  try {
    await connectDB();
    const players = await Player.find({}).sort({ name: 1 });
    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const player = new Player(body);
    await player.save();
    
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    );
  }
}
