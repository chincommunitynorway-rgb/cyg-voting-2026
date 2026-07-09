"use client";

import { missCandidates, mrCandidates } from "@/data/candidates";

type Props = {
  selectedMiss: number | null;
  selectedMr: number | null;

  loading: boolean;

  verified: boolean;

  onSubmit: () => void;
};

export default function VoteSummary({
  selectedMiss,
  selectedMr,
  loading,
  verified,
  onSubmit,
}: Props) {
  const miss = missCandidates.find(
    (c) => c.id === selectedMiss
  );

  const mr = mrCandidates.find(
    (c) => c.id === selectedMr
  );

  return (
    <section className="mt-16 rounded-3xl bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-black text-white">
        ❤️ Your Vote
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-red-600 bg-zinc-950 p-6">

          <p className="mb-2 text-red-400 font-bold">
            👑 Miss
          </p>

          <p className="text-2xl font-bold text-white">
            {miss?.name ?? "No Miss selected"}
          </p>

        </div>

        <div className="rounded-2xl border border-blue-600 bg-zinc-950 p-6">

          <p className="mb-2 text-blue-400 font-bold">
            🤵 Mr
          </p>

          <p className="text-2xl font-bold text-white">
            {mr?.name ?? "No Mr selected"}
          </p>

        </div>

      </div>

      {!verified && (

        <div className="mt-8 rounded-2xl border border-yellow-500 bg-yellow-500/10 p-5">

          <p className="text-yellow-300">
            Please verify your email before submitting your vote.
          </p>

        </div>

      )}

      <button
        type="button"
        disabled={!verified || loading}
        onClick={onSubmit}
        className={`mt-10 w-full rounded-2xl py-5 text-xl font-black text-white transition ${
          verified
            ? "bg-red-600 hover:bg-red-700"
            : "cursor-not-allowed bg-gray-700"
        }`}
      >
        {loading
          ? "Submitting..."
          : "❤️ Submit Vote"}
      </button>

    </section>
  );
}