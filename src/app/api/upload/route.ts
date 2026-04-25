import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const BUCKET = "uploads";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Thiếu cấu hình Supabase Storage");
  return createClient(url, key);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Không có file" }, { status: 400 });

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Chỉ chấp nhận ảnh jpg, png, webp, gif" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File quá lớn, tối đa 5MB" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bytes = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, bytes, { contentType: file.type, upsert: false });

    if (error) {
      console.error("[upload] Supabase error:", error);
      return NextResponse.json({ error: `Supabase: ${error.message}` }, { status: 500 });
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    return NextResponse.json({ url: data.publicUrl });
  } catch (err) {
    console.error("[upload] Unexpected error:", err);
    const msg = err instanceof Error ? err.message : "Không thể lưu file";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
