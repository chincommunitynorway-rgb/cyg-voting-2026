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
    <section className="mx-auto mt-8 max-w-3xl rounded-2xl bg-zinc-900 p-5 text-center shadow-2xl sm:mt-12 sm:rounded-3xl sm:p-8 lg:mt-20 lg:p-12">
      <div className="mb-5 text-5xl sm:mb-6 sm:text-6xl lg:mb-8 lg:text-7xl">
        ❤️
      </div>

      <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
        Thank You!
      </h1>

      <p className="mt-3 text-sm text-gray-400 sm:mt-5 sm:text-base lg:text-lg">
        Your vote has been successfully recorded.
      </p>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
        <div className="rounded-xl border border-red-600 bg-zinc-950 p-4 sm:rounded-2xl sm:p-6">
          <p className="text-sm font-bold text-red-400 sm:text-base">
            👑 Miss
          </p>

          <h2 className="mt-2 text-xl font-bold text-white sm:mt-3 sm:text-2xl">
            {miss?.name}
          </h2>
        </div>

        <div className="rounded-xl border border-blue-600 bg-zinc-950 p-4 sm:rounded-2xl sm:p-6">
          <p className="text-sm font-bold text-blue-400 sm:text-base">
            🤵 Mr
          </p>

          <h2 className="mt-2 text-xl font-bold text-white sm:mt-3 sm:text-2xl">
            {mr?.name}
          </h2>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-zinc-950 p-4 sm:mt-10 sm:rounded-2xl sm:p-6">
        <p className="text-sm text-gray-400 sm:text-base">
          Reference Number
        </p>

        <h2 className="mt-2 break-all text-xl font-black tracking-[2px] text-green-400 sm:mt-3 sm:text-2xl sm:tracking-[3px] lg:text-3xl lg:tracking-[5px]">
          {reference}
        </h2>
      </div>

      <p className="mt-8 text-sm text-gray-400 sm:mt-10 sm:text-base">
        Please keep your reference number if you need to contact the organisers.
      </p>

      <button
        onClick={onDone}
        className="mt-8 w-full rounded-xl bg-red-600 px-6 py-3 text-base font-bold text-white transition hover:bg-red-700 sm:mt-10 sm:w-auto sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg lg:mt-12 lg:px-10"
      >
        Back to Home
      </button>
    </section>
  );
}