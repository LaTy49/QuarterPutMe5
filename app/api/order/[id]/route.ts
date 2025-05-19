import { NextResponse } from 'next/server';

// PUT handler for updating an order by ID
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
    if (!body.userId && !body.totalAmount && !body.status) {
      return NextResponse.json(
        { error: 'At least one field to update is required' },
        { status: 400 }
      );
    }

    // Here you would typically update the order in your database
    const updatedOrder = {
      id: Number(id),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: `Order ${id} updated successfully`, order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing an order by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from route parameters
    const id = params.id;

    // Here you would typically delete the order from your database
    // You might also want to delete related order items

    return NextResponse.json(
      { message: `Order ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}