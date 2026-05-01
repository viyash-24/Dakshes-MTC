import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/product";

export const dynamic = 'force-dynamic';

// GET - Fetch all products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, price, image, description, category, code } = body;

    // Validate required fields
    if (!name || price === undefined || price === null || !image) {
      return NextResponse.json(
        { success: false, message: "Name, price, and image are required" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price,
      image,
      description: description || "",
      category: category || "",
      code: code || "",
    });

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}