import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, phone } = await req.json();

    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    ).toISOString();

    // Delete any existing code
    await supabase
      .from("verification_codes")
      .delete()
      .eq("email", email);

    // Save new code
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

    // Send email
    const { error: emailError } = await resend.emails.send({
      from: "CYG Voting <noreply@norwaychin.no>",
      to: email,
      subject: "CYG Voting Verification Code",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2>❤️ CYG Voting 2026</h2>

          <p>Your verification code is:</p>

          <h1 style="
            font-size:42px;
            letter-spacing:8px;
            color:#dc2626;
            margin:20px 0;
          ">
            ${code}
          </h1>

          <p>
            This verification code expires in
            <strong>10 minutes</strong>.
          </p>

          <hr style="margin:30px 0">

          <p style="color:#666;font-size:14px">
            If you did not request this code,
            you can safely ignore this email.
          </p>
        </div>
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

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}