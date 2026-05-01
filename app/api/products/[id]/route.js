import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/product";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = 'force-dynamic';

// PUT - Update a product
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const formData = await request.formData();

    const updateData = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      category: formData.get("category"),
      code: formData.get("code"),
    };

    let image = formData.get("image");

    if (image && typeof image === "object" && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = `data:${image.type};base64,${buffer.toString("base64")}`;
      
      const uploadRes = await cloudinary.uploader.upload(base64Data, {
        folder: "dakshes_products",
      });
      updateData.image = uploadRes.secure_url;
    }

    const sizes = formData.getAll('sizes');
    if (sizes && sizes.length > 0) {
        updateData.sizes = sizes;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: product },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
