export const runtime = 'nodejs';

import { prisma } from '../../../db/db';
import { NextResponse } from 'next/server';

// GET all categories
export async function GET() {
  try {
    const category = await prisma.category.findMany();
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

// POST create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    // Validate input
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
