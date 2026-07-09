import CandidateCard from "./CandidateCard";
import { missCandidates, mrCandidates } from "../data/candidates";

export default function Candidates() {
  return (
    <section
      id="contestants"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* MISS */}

      <div className="mb-10 text-center sm:mb-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-red-500 sm:mb-4 sm:text-sm sm:tracking-[8px]">
          CYG 2026
        </p>

        <h2 className="text-3xl font-black text-white sm:text-5xl md:text-6xl">
          👑 MISS CONTESTANTS
        </h2>

        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-600 sm:mt-6 sm:w-28"></div>
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {missCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            {...candidate}
            type="miss"
          />
        ))}
      </div>

      {/* MR */}

      <div className="mb-10 mt-16 text-center sm:mb-16 sm:mt-24 lg:mt-32">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-blue-500 sm:mb-4 sm:text-sm sm:tracking-[8px]">
          CYG 2026
        </p>

        <h2 className="text-3xl font-black text-white sm:text-5xl md:text-6xl">
          🤵 MR CONTESTANTS
        </h2>

        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-blue-500 sm:mt-6 sm:w-28"></div>
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {mrCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            {...candidate}
            type="mr"
          />
        ))}
      </div>
    </section>
  );
}