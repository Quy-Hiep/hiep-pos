import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const drivers = await prisma.driver.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(drivers);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const driver = await prisma.driver.create({ data: body });
    return NextResponse.json(driver, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
