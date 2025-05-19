import { NextResponse } from 'next/server';

// GET handler for retrieving all products
export async function GET() {
  try {
    // Here you would typically fetch data from your database
    const products = [
      { 
        id: 1, 
        name: 'Smartphone', 
        description: 'Latest model smartphone with advanced features',
        price: 699.99,
        categoryId: 1,
        stock: 50
      },
      { 
        id: 2, 
        name: 'T-shirt', 
        description: 'Cotton t-shirt with logo print',
        price: 24.99,
        categoryId: 2,
        stock: 100
      },
      { 
        id: 3, 
        name: 'Novel', 
        description: 'Bestselling fiction novel',
        price: 14.99,
        categoryId: 3,
        stock: 75
      },
    ];

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new product
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: 'Product name, price, and category ID are required' },
        { status: 400 }
      );
    }

    // Here you would typically save the data to your database
    const newProduct = {
      id: Math.floor(Math.random() * 1000),
      ...body,
      stock: body.stock || 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: 'Product created successfully', product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}