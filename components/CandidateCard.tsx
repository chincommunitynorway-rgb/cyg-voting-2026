import Link from "next/link";

type Props = {
  id: number;
  name: string;
  image: string;
  type: "miss" | "mr";
};

export default function CandidateCard({
  id,
  name,
  image,
  type,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover"
      />

      <div className="p-5 text-center">
        <h2 className="text-2xl font-bold text-white">
          {id}. {name}
        </h2>

        <Link href={`/vote?type=${type}&id=${id}`}>
          <button className="mt-5 w-full rounded-xl bg-red-600 py-3 text-white font-bold hover:bg-red-700 transition">
            Vote
          </button>
        </Link>
      </div>
    </div>
  );
}