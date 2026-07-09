import CandidateCard from "./CandidateCard";
import { missCandidates, mrCandidates } from "../data/candidates";

export default function Candidates() {
  return (
    <section
      id="contestants"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      {/* MISS */}

      <div className="text-center mb-16">

        <p className="uppercase tracking-[8px] text-red-500 mb-4 font-semibold">
          CYG 2026
        </p>

        <h2 className="text-5xl md:text-6xl font-black text-white">
          👑 MISS CONTESTANTS
        </h2>

        <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-red-600"></div>

      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {missCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            {...candidate}
            type="miss"
          />
        ))}
      </div>

      {/* MR */}

      <div className="text-center mt-32 mb-16">

        <p className="uppercase tracking-[8px] text-blue-500 mb-4 font-semibold">
          CYG 2026
        </p>

        <h2 className="text-5xl md:text-6xl font-black text-white">
          🤵 MR CONTESTANTS
        </h2>

        <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-blue-500"></div>

      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
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