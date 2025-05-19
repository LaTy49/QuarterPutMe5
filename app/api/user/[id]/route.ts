import { NextResponse } from 'next/server';

// PUT handler for updating a user by ID
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
    if (!body.name && !body.email && !body.role) {
      return NextResponse.json(
        { error: 'At least one field to update is required' },
        { status: 400 }
      );
    }

    // Here you would typically update the user in your database
    const updatedUser = {
      id: Number(id),
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Remove password from response for security
    const { password, ...userResponse } = updatedUser;

    return NextResponse.json(
      { message: `User ${id} updated successfully`, user: userResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing a user by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from route parameters
    const id = params.id;

    // Here you would typically delete the user from your database
    // You might also want to check for related orders before deletion or 
    // implement soft deletion by setting an "isActive" flag to false

    return NextResponse.json(
      { message: `User ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}