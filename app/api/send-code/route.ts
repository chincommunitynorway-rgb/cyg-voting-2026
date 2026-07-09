import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json();

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    ).toISOString();

    // Slett eventuell gammel kode
    await supabase
      .from("verification_codes")
      .delete()
      .eq("email", email);

    // Lagre ny kode
    const { error } = await supabase
      .from("verification_codes")
      .insert({
        email,
        phone,
        code,
        expires_at: expiresAt,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Send e-post
    const { error: emailError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "CYG Voting Verification Code",
      html: `
        <h2>CYG Voting 2026</h2>

        <p>Your verification code is:</p>

        <h1 style="letter-spacing:6px;">
          ${code}
        </h1>

        <p>This code expires in 10 minutes.</p>
      `,
    });

    if (emailError) {
      return NextResponse.json(
        { error: emailError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch {
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}