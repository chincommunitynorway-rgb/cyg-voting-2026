import CandidateCard from "./CandidateCard";
import { missCandidates, mrCandidates } from "../data/candidates";

export default function Candidates() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">

      {/* MISS */}
      <h2 className="text-5xl font-bold text-center text-white mb-16">
        MISS CONTESTANTS
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {missCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            id={candidate.id}
            name={candidate.name}
            image={candidate.image}
            type="miss"
          />
        ))}
      </div>

      {/* MR */}
      <h2 className="text-5xl font-bold text-center text-white mt-24 mb-16">
        MR CONTESTANTS
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {mrCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            id={candidate.id}
            name={candidate.name}
            image={candidate.image}
            type="mr"
          />
        ))}
      </div>

    </section>
  );
}