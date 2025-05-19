import { NextResponse } from 'next/server';

// GET handler for retrieving all categories
export async function GET() {
  try {
    // Here you would typically fetch data from your database
    const categories = [
      { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
      { id: 2, name: 'Clothing', description: 'Apparel and fashion items' },
      { id: 3, name: 'Books', description: 'Books and publications' },
    ];

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new category
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Here you would typically save the data to your database
    const newCategory = {
      id: Math.floor(Math.random() * 1000),
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: 'Category created successfully', category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}