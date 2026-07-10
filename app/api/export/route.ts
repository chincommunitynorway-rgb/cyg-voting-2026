import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { createClient } from "../../../lib/server";

export async function GET() {
  const supabase = await createClient();

  const { data: votes, error } = await supabase
    .from("votes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Votes");

  worksheet.columns = [
    { header: "Name", key: "full_name", width: 30 },
    { header: "Email", key: "email", width: 35 },
    { header: "Phone", key: "phone", width: 20 },
    { header: "Miss", key: "miss_candidate_name", width: 25 },
    { header: "Mr", key: "mr_candidate_name", width: 25 },
    { header: "Reference", key: "reference_number", width: 20 },
    { header: "Time", key: "created_at", width: 25 },
  ];

  votes?.forEach((vote) => {
    worksheet.addRow({
      full_name: vote.full_name,
      email: vote.email,
      phone: vote.phone,
      miss_candidate_name: vote.miss_candidate_name,
      mr_candidate_name: vote.mr_candidate_name,
      reference_number: vote.reference_number,
      created_at: new Date(vote.created_at).toLocaleString("nb-NO"),
    });
  });

  // Stil på overskriften
  const header = worksheet.getRow(1);
  header.font = {
    bold: true,
    color: { argb: "FFFFFFFF" },
  };

  header.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF16A34A" },
  };

  worksheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];

  worksheet.autoFilter = {
    from: "A1",
    to: "G1",
  };

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="CYG_Votes.xlsx"',
    },
  });
}