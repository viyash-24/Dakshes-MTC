import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/product";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const formData = await request.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    let image = formData.get("image");
    const description = formData.get("description");
    const category = formData.get("category");
    const code = formData.get("code");
    const sizes = formData.getAll("sizes");

    // ===== CLOUDINARY UPLOAD COMPONENT =====
    if (image && typeof image === "object" && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Convert buffer directly to a base64 Data URI
      const base64Data = `data:${image.type};base64,${buffer.toString("base64")}`;
      
      const uploadRes = await cloudinary.uploader.upload(base64Data, {
        folder: "dakshes_products",
      });
      image = uploadRes.secure_url;
    }
    // =======================================

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
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L']
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