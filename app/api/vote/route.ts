import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function generateReference() {
  return (
    "CYG-2026-" +
    Math.floor(100000 + Math.random() * 900000)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      full_name,
      email,
      phone,
      miss_candidate_id,
      miss_candidate_name,
      mr_candidate_id,
      mr_candidate_name,
    } = body;

    if (
      !full_name ||
      !email ||
      !phone ||
      !miss_candidate_id ||
      !mr_candidate_id
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    // Has this email already voted?
    const { data: existingEmail } = await supabase
      .from("votes")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingEmail) {
      return NextResponse.json(
        {
          error: "This email has already voted.",
        },
        { status: 400 }
      );
    }

    // Has this phone already voted?
    const { data: existingPhone } = await supabase
      .from("votes")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (existingPhone) {
      return NextResponse.json(
        {
          error: "This phone number has already voted.",
        },
        { status: 400 }
      );
    }

    // Is the email verified?
    const { data: verification } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .eq("verified", true)
      .maybeSingle();

    if (!verification) {
      return NextResponse.json(
        {
          error: "Email has not been verified.",
        },
        { status: 400 }
      );
    }

    const reference = generateReference();

    const { error } = await supabase
      .from("votes")
      .insert({
        full_name,
        email,
        phone,

        miss_candidate_id,
        miss_candidate_name,

        mr_candidate_id,
        mr_candidate_name,

        reference_number: reference,
      });

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reference,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}