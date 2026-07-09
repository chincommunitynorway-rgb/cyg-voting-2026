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
    <section className="mt-8 rounded-2xl bg-zinc-900 p-4 sm:mt-12 sm:rounded-3xl sm:p-6 lg:mt-16 lg:p-8">
      <h2 className="mb-5 text-2xl font-black text-white sm:mb-6 sm:text-3xl lg:mb-8">
        ❤️ Your Vote
      </h2>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
        <div className="rounded-xl border border-red-600 bg-zinc-950 p-4 sm:rounded-2xl sm:p-6">
          <p className="mb-2 text-sm font-bold text-red-400 sm:text-base">
            👑 Miss
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">
            {miss?.name ?? "No Miss selected"}
          </p>
        </div>

        <div className="rounded-xl border border-blue-600 bg-zinc-950 p-4 sm:rounded-2xl sm:p-6">
          <p className="mb-2 text-sm font-bold text-blue-400 sm:text-base">
            🤵 Mr
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">
            {mr?.name ?? "No Mr selected"}
          </p>
        </div>
      </div>

      {!verified && (
        <div className="mt-5 rounded-xl border border-yellow-500 bg-yellow-500/10 p-4 sm:mt-8 sm:rounded-2xl sm:p-5">
          <p className="text-sm text-yellow-300 sm:text-base">
            Please verify your email before submitting your vote.
          </p>
        </div>
      )}

      <button
        type="button"
        disabled={!verified || loading}
        onClick={onSubmit}
        className={`mt-6 w-full rounded-xl py-3 text-base font-black text-white transition sm:mt-8 sm:rounded-2xl sm:py-4 sm:text-lg lg:mt-10 lg:py-5 lg:text-xl ${
          verified
            ? "bg-red-600 hover:bg-red-700"
            : "cursor-not-allowed bg-gray-700"
        }`}
      >
        {loading ? "Submitting..." : "❤️ Submit Vote"}
      </button>
    </section>
  );
}