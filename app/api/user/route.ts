import { NextResponse } from 'next/server';

// GET handler for retrieving all users
export async function GET() {
  try {
    // Here you would typically fetch data from your database
    const users = [
      { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com',
        role: 'customer',
        createdAt: '2025-01-15T10:30:00Z' 
      },
      { 
        id: 2, 
        name: 'Jane Smith', 
        email: 'jane@example.com',
        role: 'admin',
        createdAt: '2025-02-20T14:45:00Z' 
      },
      { 
        id: 3, 
        name: 'Bob Johnson', 
        email: 'bob@example.com',
        role: 'customer',
        createdAt: '2025-03-10T09:15:00Z' 
      },
    ];

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new user
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Here you would typically check if email already exists and hash password
    
    // Here you would typically save the data to your database
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      ...body,
      role: body.role || 'customer',
      createdAt: new Date().toISOString(),
    };

    // Remove password from response for security
    const { password, ...userResponse } = newUser;

    return NextResponse.json(
      { message: 'User created successfully', user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}