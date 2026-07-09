import { createClient } from "../../lib/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: votes, error } = await supabase
    .from("votes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Failed to load votes.
        </h1>
      </main>
    );
  }

  function countVotes(
    field: "miss_candidate_name" | "mr_candidate_name"
  ) {
    const result: Record<string, number> = {};

    votes?.forEach((vote) => {
      const candidate = vote[field];

      if (!candidate) return;

      result[candidate] = (result[candidate] || 0) + 1;
    });

    return Object.entries(result).sort(
      (a, b) => b[1] - a[1]
    );
  }

  const missResults = countVotes("miss_candidate_name");
  const mrResults = countVotes("mr_candidate_name");

  return (
    <main className="min-h-screen bg-black text-white p-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-12">

        <div>
          <h1 className="text-5xl font-black">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-zinc-400">
            Total Votes:{" "}
            <span className="font-bold text-green-400">
              {votes?.length ?? 0}
            </span>
          </p>
        </div>

        <div className="flex gap-4">

          <a
            href="/api/export"
            className="rounded-xl bg-green-600 px-6 py-3 font-bold hover:bg-green-700"
          >
            📥 Export CSV
          </a>

          <form action="/logout" method="POST">
            <button
              className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
              type="submit"
            >
              Logout
            </button>
          </form>

        </div>

      </div>

      {/* Leaderboards */}

      <div className="grid gap-8 lg:grid-cols-2 mb-12">

        <div className="rounded-2xl bg-zinc-900 p-8">

          <h2 className="mb-8 text-3xl font-black text-pink-400">
            👑 MISS Leaderboard
          </h2>

          {missResults.length === 0 ? (
            <p className="text-zinc-500">
              No votes yet.
            </p>
          ) : (
            missResults.map(([name, count], index) => (
              <div
                key={name}
                className="flex justify-between border-b border-zinc-700 py-4"
              >
                <span className="text-lg font-semibold">
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}
                  {index > 2 && `${index + 1}. `}
                  {name}
                </span>

                <span className="text-xl font-black text-pink-400">
                  {count}
                </span>
              </div>
            ))
          )}

        </div>

        <div className="rounded-2xl bg-zinc-900 p-8">

          <h2 className="mb-8 text-3xl font-black text-blue-400">
            🤵 MR Leaderboard
          </h2>

          {mrResults.length === 0 ? (
            <p className="text-zinc-500">
              No votes yet.
            </p>
          ) : (
            mrResults.map(([name, count], index) => (
              <div
                key={name}
                className="flex justify-between border-b border-zinc-700 py-4"
              >
                <span className="text-lg font-semibold">
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}
                  {index > 2 && `${index + 1}. `}
                  {name}
                </span>

                <span className="text-xl font-black text-blue-400">
                  {count}
                </span>
              </div>
            ))
          )}

        </div>

      </div>

      {/* Votes Table */}

      <div className="overflow-x-auto rounded-2xl border border-zinc-700">

        <table className="w-full">

          <thead className="bg-zinc-900">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Miss</th>
              <th className="p-4 text-left">Mr</th>
              <th className="p-4 text-left">Reference</th>
              <th className="p-4 text-left">Time</th>
            </tr>

          </thead>

          <tbody>

            {votes?.map((vote) => (

              <tr
                key={vote.id}
                className="border-t border-zinc-800 hover:bg-zinc-900"
              >

                <td className="p-4">{vote.full_name}</td>

                <td className="p-4">{vote.email}</td>

                <td className="p-4">{vote.phone}</td>

                <td className="p-4">
                  {vote.miss_candidate_name}
                </td>

                <td className="p-4">
                  {vote.mr_candidate_name}
                </td>

                <td className="p-4 font-bold text-green-400">
                  {vote.reference_number}
                </td>

                <td className="p-4">
                  {new Date(vote.created_at).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}