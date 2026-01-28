import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb(); // tries to connect to MongoDB

    // Simple command to verify the connection works
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      ok: true,
      message: "MongoDB connected",
      collections: collections.map((c) => c.name),
    });
  } catch (error: any) {
    console.error("DB test error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "MongoDB connection failed",
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

