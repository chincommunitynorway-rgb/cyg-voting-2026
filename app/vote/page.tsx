import { missCandidates, mrCandidates } from "../../data/candidates";
import VoteForm from "../../components/VoteForm";

type VotePageProps = {
  searchParams: Promise<{
    type?: string;
    id?: string;
  }>;
};

export default async function VotePage({
  searchParams,
}: VotePageProps) {
  const params = await searchParams;

  const type = params.type;
  const id = Number(params.id);

  const candidate =
    type === "miss"
      ? missCandidates.find((c) => c.id === id)
      : mrCandidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-white text-3xl">
          Candidate not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-lg">

        <h1 className="text-5xl font-bold text-center text-white mb-3">
          Vote
        </h1>

        <p className="text-center text-gray-400 mb-8">
          You are voting for
        </p>

        <div className="bg-zinc-800 rounded-xl p-5 mb-8 text-center">

          <h2 className="text-3xl font-bold text-white">
            {type?.toUpperCase()} #{candidate.id}
          </h2>

          <p className="text-red-500 text-xl mt-2 font-semibold">
            {candidate.name}
          </p>

        </div>

        <VoteForm
          type={type as "miss" | "mr"}
          candidateId={candidate.id}
          candidateName={candidate.name}
        />

      </div>
    </main>
  );
}