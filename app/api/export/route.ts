import { NextResponse } from "next/server";
import { createClient } from "../../../lib/server";

export async function GET() {
  const supabase = await createClient();

  const { data: votes } = await supabase
    .from("votes")
    .select("*")
    .order("created_at", { ascending: false });

  const header =
    "Name,Email,Phone,Category,Candidate,Time\n";

  const rows =
    votes
      ?.map(
        (vote) =>
          `"${vote.full_name}","${vote.email}","${vote.phone}","${vote.category}","${vote.candidate_name}","${vote.created_at}"`
      )
      .join("\n") ?? "";

  return new NextResponse(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="votes.csv"',
    },
  });
}