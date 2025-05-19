import { NextResponse } from 'next/server';

// PUT handler for updating a product by ID
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
    if (!body.name && !body.price && !body.description && !body.categoryId && !body.stock) {
      return NextResponse.json(
        { error: 'At least one field to update is required' },
        { status: 400 }
      );
    }

    // Here you would typically update the product in your database
    const updatedProduct = {
      id: Number(id),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: `Product ${id} updated successfully`, product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing a product by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from route parameters
    const id = params.id;

    // Here you would typically delete the product from your database
    // You might also want to check for related order items before deletion

    return NextResponse.json(
      { message: `Product ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}