"use client";

import Image from "next/image";
import { missCandidates, mrCandidates } from "@/data/candidates";

type Props = {
  selectedMiss: number | null;
  selectedMr: number | null;

  setSelectedMiss: (id: number) => void;
  setSelectedMr: (id: number) => void;
};

export default function CandidateSelector({
  selectedMiss,
  selectedMr,
  setSelectedMiss,
  setSelectedMr,
}: Props) {
  return (
    <>

      {/* MISS */}

      <section className="mt-14">

        <h2 className="mb-8 text-4xl font-black text-red-500">
          👑 Choose Miss
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {missCandidates.map((candidate) => (

            <button
              key={candidate.id}
              type="button"
              onClick={() => setSelectedMiss(candidate.id)}
              className={`overflow-hidden rounded-3xl border transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                selectedMiss === candidate.id
                  ? "border-red-500 ring-4 ring-red-500"
                  : "border-zinc-700"
              }`}
            >

              <div className="relative h-[340px]">

                <Image
                  src={candidate.image}
                  alt={candidate.name}
                  fill
                  sizes="(max-width:768px) 100vw,
                         (max-width:1200px) 50vw,
                         25vw"
                  className="object-cover"
                />

                {selectedMiss === candidate.id && (

                  <div className="absolute right-4 top-4 rounded-full bg-red-600 px-4 py-2 font-bold text-white">
                    ✓ Selected
                  </div>

                )}

              </div>

              <div className="bg-zinc-950 p-6">

                <h3 className="text-xl font-bold text-white">
                  {candidate.name}
                </h3>

                <p className="mt-2 text-red-400">
                  {candidate.title}
                </p>

              </div>

            </button>

          ))}

        </div>

      </section>      {/* MR */}

      <section className="mt-20">

        <h2 className="mb-8 text-4xl font-black text-blue-500">
          🤵 Choose Mr
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {mrCandidates.map((candidate) => (

            <button
              key={candidate.id}
              type="button"
              onClick={() => setSelectedMr(candidate.id)}
              className={`overflow-hidden rounded-3xl border transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                selectedMr === candidate.id
                  ? "border-blue-500 ring-4 ring-blue-500"
                  : "border-zinc-700"
              }`}
            >

              <div className="relative h-[340px]">

                <Image
                  src={candidate.image}
                  alt={candidate.name}
                  fill
                  sizes="(max-width:768px) 100vw,
                         (max-width:1200px) 50vw,
                         25vw"
                  className="object-cover"
                />

                {selectedMr === candidate.id && (

                  <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-4 py-2 font-bold text-white">
                    ✓ Selected
                  </div>

                )}

              </div>

              <div className="bg-zinc-950 p-6">

                <h3 className="text-xl font-bold text-white">
                  {candidate.name}
                </h3>

                <p className="mt-2 text-blue-400">
                  {candidate.title}
                </p>

              </div>

            </button>

          ))}

        </div>

      </section>

    </>
  );
}