import { NextResponse } from 'next/server';

// GET handler for retrieving all orders
export async function GET() {
  try {
    // Here you would typically fetch data from your database
    const orders = [
      { 
        id: 1, 
        userId: 101, 
        totalAmount: 125.99, 
        status: 'completed', 
        createdAt: '2025-05-15T10:30:00Z' 
      },
      { 
        id: 2, 
        userId: 102, 
        totalAmount: 79.50, 
        status: 'processing', 
        createdAt: '2025-05-16T14:45:00Z' 
      },
      { 
        id: 3, 
        userId: 103, 
        totalAmount: 214.75, 
        status: 'pending', 
        createdAt: '2025-05-17T09:15:00Z' 
      },
    ];

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new order
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.userId || !body.totalAmount) {
      return NextResponse.json(
        { error: 'User ID and total amount are required' },
        { status: 400 }
      );
    }

    // Here you would typically save the data to your database
    const newOrder = {
      id: Math.floor(Math.random() * 1000),
      ...body,
      status: body.status || 'pending',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: 'Order created successfully', order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}