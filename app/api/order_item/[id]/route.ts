import { NextResponse } from 'next/server';

// PUT handler for updating an order item by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from route parameters
    const id = params.id;
    
    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.quantity && !body.price) {
      return NextResponse.json(
        { error: 'At least one field to update is required' },
        { status: 400 }
      );
    }

    // Here you would typically update the order item in your database
    const updatedOrderItem = {
      id: Number(id),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: `Order item ${id} updated successfully`, orderItem: updatedOrderItem },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order item:', error);
    return NextResponse.json(
      { error: 'Failed to update order item' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing an order item by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from route parameters
    const id = params.id;

    // Here you would typically delete the order item from your database
    // You might also want to update the related order total

    return NextResponse.json(
      { message: `Order item ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting order item:', error);
    return NextResponse.json(
      { error: 'Failed to delete order item' },
      { status: 500 }
    );
  }
}