import { NextResponse } from "next/server";

import { connectMongo } from "@/lib/mongoose";

export async function GET() {
  await connectMongo();
  return NextResponse.json({ ok: true });
}


