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

  const { data: votes } = await supabase
    .from("votes")
    .select("*")
    .order("created_at", { ascending: false });

  const missVotes =
    votes?.filter((v) => v.category === "miss") ?? [];

  const mrVotes =
    votes?.filter((v) => v.category === "mr") ?? [];

  function countVotes(arr: typeof votes) {
    const result: Record<string, number> = {};

    arr?.forEach((vote) => {
      result[vote.candidate_name] =
        (result[vote.candidate_name] || 0) + 1;
    });

    return result;
  }

  const missResults = Object.entries(countVotes(missVotes)).sort(
    (a, b) => b[1] - a[1]
  );

  const mrResults = Object.entries(countVotes(mrVotes)).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <main className="min-h-screen bg-black text-white p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex gap-3">

          <a
            href="/api/export"
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-bold transition"
          >
            📥 Export CSV
          </a>

          <form action="/logout" method="POST">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-bold transition"
            >
              Logout
            </button>
          </form>

        </div>
      </div>

      {/* Result Cards */}

      <div className="grid md:grid-cols-2 gap-8 mb-10">

        <div className="bg-zinc-900 p-8 rounded-xl shadow-lg">

          <h2 className="text-3xl font-bold text-pink-400 mb-6">
            👑 MISS Results
          </h2>

          {missResults.map(([name, voteCount], index) => (
            <div
              key={name}
              className="flex justify-between border-b border-zinc-700 py-3"
            >
              <span className="text-lg">
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                {name}
              </span>

              <span className="font-bold text-lg">
                {voteCount} votes
              </span>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl shadow-lg">

          <h2 className="text-3xl font-bold text-blue-400 mb-6">
            🤵 MR Results
          </h2>

          {mrResults.map(([name, voteCount], index) => (
            <div
              key={name}
              className="flex justify-between border-b border-zinc-700 py-3"
            >
              <span className="text-lg">
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                {name}
              </span>

              <span className="font-bold text-lg">
                {voteCount} votes
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Vote Table */}

      <div className="overflow-x-auto rounded-xl border border-zinc-700">

        <table className="w-full">

          <thead className="bg-zinc-900 text-lg">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Candidate</th>
              <th className="p-4 text-left">Time</th>
            </tr>

          </thead>

          <tbody>

            {votes?.map((vote) => (

              <tr
                key={vote.id}
                className="border-t border-zinc-700 hover:bg-zinc-900"
              >

                <td className="p-4">{vote.full_name}</td>

                <td className="p-4">{vote.email}</td>

                <td className="p-4">{vote.phone}</td>

                <td className="p-4 uppercase">
                  {vote.category}
                </td>

                <td className="p-4 font-semibold">
                  {vote.candidate_name}
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