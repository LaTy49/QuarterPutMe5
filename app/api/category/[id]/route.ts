import { NextResponse } from 'next/server';

// PUT handler for updating a category by ID
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
    if (!body.name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Here you would typically update the category in your database
    const updatedCategory = {
      id: Number(id),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: `Category ${id} updated successfully`, category: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing a category by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from route parameters
    const id = params.id;

    // Here you would typically delete the category from your database
    // You might also want to check for related products before deletion

    return NextResponse.json(
      { message: `Category ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}