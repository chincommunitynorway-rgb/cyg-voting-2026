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
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold sm:text-3xl">
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

    return Object.entries(result).sort((a, b) => b[1] - a[1]);
  }

  const missResults = countVotes("miss_candidate_name");
  const mrResults = countVotes("mr_candidate_name");

  return (
    <main className="min-h-screen bg-black p-4 text-white sm:p-6 lg:p-10">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-zinc-400 sm:text-base">
            Total Votes:{" "}
            <span className="font-bold text-green-400">
              {votes?.length ?? 0}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/api/export"
            className="w-full rounded-xl bg-green-600 px-5 py-3 text-center font-bold transition hover:bg-green-700 sm:w-auto"
          >
            📥 Export CSV
          </a>

          <form action="/logout" method="POST">
            <button
              className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-700 sm:w-auto"
              type="submit"
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Leaderboards */}

      <div className="mb-8 grid gap-5 lg:mb-12 lg:grid-cols-2 lg:gap-8">
        <div className="rounded-2xl bg-zinc-900 p-5 sm:p-6 lg:p-8">
          <h2 className="mb-6 text-2xl font-black text-pink-400 sm:text-3xl">
            👑 MISS Leaderboard
          </h2>

          {missResults.length === 0 ? (
            <p className="text-zinc-500">No votes yet.</p>
          ) : (
            missResults.map(([name, count], index) => (
              <div
                key={name}
                className="flex items-center justify-between gap-3 border-b border-zinc-700 py-3 sm:py-4"
              >
                <span className="text-base font-semibold sm:text-lg">
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}
                  {index > 2 && `${index + 1}. `}
                  {name}
                </span>

                <span className="text-lg font-black text-pink-400 sm:text-xl">
                  {count}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl bg-zinc-900 p-5 sm:p-6 lg:p-8">
          <h2 className="mb-6 text-2xl font-black text-blue-400 sm:text-3xl">
            🤵 MR Leaderboard
          </h2>

          {mrResults.length === 0 ? (
            <p className="text-zinc-500">No votes yet.</p>
          ) : (
            mrResults.map(([name, count], index) => (
              <div
                key={name}
                className="flex items-center justify-between gap-3 border-b border-zinc-700 py-3 sm:py-4"
              >
                <span className="text-base font-semibold sm:text-lg">
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}
                  {index > 2 && `${index + 1}. `}
                  {name}
                </span>

                <span className="text-lg font-black text-blue-400 sm:text-xl">
                  {count}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Votes Table */}

      <div className="overflow-x-auto rounded-2xl border border-zinc-700">
        <table className="min-w-[900px] w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="whitespace-nowrap p-3 text-left text-sm sm:p-4">
                Name
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm sm:p-4">
                Email
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm sm:p-4">
                Phone
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm sm:p-4">
                Miss
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm sm:p-4">
                Mr
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm sm:p-4">
                Reference
              </th>
              <th className="whitespace-nowrap p-3 text-left text-sm sm:p-4">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {votes?.map((vote) => (
              <tr
                key={vote.id}
                className="border-t border-zinc-800 hover:bg-zinc-900"
              >
                <td className="whitespace-nowrap p-3 text-sm sm:p-4">
                  {vote.full_name}
                </td>

                <td className="whitespace-nowrap p-3 text-sm sm:p-4">
                  {vote.email}
                </td>

                <td className="whitespace-nowrap p-3 text-sm sm:p-4">
                  {vote.phone}
                </td>

                <td className="whitespace-nowrap p-3 text-sm sm:p-4">
                  {vote.miss_candidate_name}
                </td>

                <td className="whitespace-nowrap p-3 text-sm sm:p-4">
                  {vote.mr_candidate_name}
                </td>

                <td className="whitespace-nowrap p-3 text-sm font-bold text-green-400 sm:p-4">
                  {vote.reference_number}
                </td>

                <td className="whitespace-nowrap p-3 text-sm sm:p-4">
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