import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Missing email or code." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Verification code not found." },
        { status: 404 }
      );
    }

    if (data.verified) {
      return NextResponse.json(
        { error: "This email has already been verified." },
        { status: 400 }
      );
    }

    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "Verification code has expired." },
        { status: 400 }
      );
    }

    if (data.code !== code) {
      return NextResponse.json(
        { error: "Incorrect verification code." },
        { status: 400 }
      );
    }

    await supabase
      .from("verification_codes")
      .update({
        verified: true,
        verified_at: new Date().toISOString(),
      })
      .eq("email", email);

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}