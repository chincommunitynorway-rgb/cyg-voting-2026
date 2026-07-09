"use client";

import { missCandidates, mrCandidates } from "@/data/candidates";

type Props = {
  selectedMiss: number;
  selectedMr: number;

  reference: string;

  onDone: () => void;
};

export default function VoteSuccess({
  selectedMiss,
  selectedMr,
  reference,
  onDone,
}: Props) {
  const miss = missCandidates.find(
    (c) => c.id === selectedMiss
  );

  const mr = mrCandidates.find(
    (c) => c.id === selectedMr
  );

  return (
    <section className="mx-auto mt-20 max-w-3xl rounded-3xl bg-zinc-900 p-12 text-center shadow-2xl">

      <div className="mb-8 text-7xl">
        ❤️
      </div>

      <h1 className="text-5xl font-black text-white">
        Thank You!
      </h1>

      <p className="mt-5 text-lg text-gray-400">
        Your vote has been successfully recorded.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-red-600 bg-zinc-950 p-6">

          <p className="text-red-400 font-bold">
            👑 Miss
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {miss?.name}
          </h2>

        </div>

        <div className="rounded-2xl border border-blue-600 bg-zinc-950 p-6">

          <p className="text-blue-400 font-bold">
            🤵 Mr
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {mr?.name}
          </h2>

        </div>

      </div>

      <div className="mt-10 rounded-2xl bg-zinc-950 p-6">

        <p className="text-gray-400">
          Reference Number
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-[5px] text-green-400">
          {reference}
        </h2>

      </div>

      <p className="mt-10 text-gray-400">
        Please keep your reference number if you
        need to contact the organisers.
      </p>

      <button
        onClick={onDone}
        className="mt-12 rounded-2xl bg-red-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-red-700"
      >
        Back to Home
      </button>

    </section>
  );
}