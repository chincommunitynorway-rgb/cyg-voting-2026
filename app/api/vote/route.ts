import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      full_name,
      email,
      phone,
      category,
      candidate_id,
      candidate_name,
    } = body;

    // Sjekk om telefonnummer allerede har stemt i samme kategori
    const { data: existingVote } = await supabase
      .from("votes")
      .select("id")
      .eq("phone", phone)
      .eq("category", category)
      .maybeSingle();

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted in this category." },
        { status: 400 }
      );
    }

    // Lagre stemmen
    const { error } = await supabase.from("votes").insert({
      full_name,
      email,
      phone,
      category,
      candidate_id,
      candidate_name,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Vote submitted successfully!",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}