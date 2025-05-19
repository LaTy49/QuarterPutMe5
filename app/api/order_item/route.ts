import { NextResponse } from 'next/server';

// GET handler for retrieving all order items
export async function GET() {
  try {
    // Here you would typically fetch data from your database
    const orderItems = [
      { 
        id: 1, 
        orderId: 101, 
        productId: 201,
        quantity: 2,
        price: 29.99
      },
      { 
        id: 2, 
        orderId: 101, 
        productId: 202,
        quantity: 1,
        price: 49.99
      },
      { 
        id: 3, 
        orderId: 102, 
        productId: 203,
        quantity: 3,
        price: 15.99
      },
    ];

    return NextResponse.json({ orderItems }, { status: 200 });
  } catch (error) {
    console.error('Error fetching order items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order items' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new order item
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.orderId || !body.productId || !body.quantity || !body.price) {
      return NextResponse.json(
        { error: 'Order ID, product ID, quantity, and price are required' },
        { status: 400 }
      );
    }

    // Here you would typically save the data to your database
    const newOrderItem = {
      id: Math.floor(Math.random() * 1000),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: 'Order item created successfully', orderItem: newOrderItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order item:', error);
    return NextResponse.json(
      { error: 'Failed to create order item' },
      { status: 500 }
    );
  }
}