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

      <section className="mt-8 md:mt-14">

        <h2 className="mb-5 md:mb-8 text-2xl md:text-4xl font-black text-red-500">
          👑 Choose Miss
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-8">

          {missCandidates.map((candidate) => (

            <button
              key={candidate.id}
              type="button"
              onClick={() => setSelectedMiss(candidate.id)}
              className={`overflow-hidden rounded-2xl md:rounded-3xl border transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                selectedMiss === candidate.id
                  ? "border-red-500 ring-2 md:ring-4 ring-red-500"
                  : "border-zinc-700"
              }`}
            >

              <div className="relative h-[180px] sm:h-[220px] md:h-[340px]">

                <Image
                  src={candidate.image}
                  alt={candidate.name}
                  fill
                  sizes="
                    (max-width:640px) 50vw,
                    (max-width:768px) 50vw,
                    (max-width:1200px) 33vw,
                    25vw
                  "
                  className="object-cover"
                />

                {selectedMiss === candidate.id && (

                  <div className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-[10px] sm:text-xs md:text-base font-bold text-white">

                    ✓ Selected

                  </div>

                )}

              </div>

              <div className="bg-zinc-950 p-2 sm:p-3 md:p-6">

                <h3 className="text-xs sm:text-sm md:text-xl font-bold text-white leading-tight">

                  {candidate.name}

                </h3>

                <p className="mt-1 text-[11px] sm:text-xs md:text-base text-red-400">

                  {candidate.title}

                </p>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* MR */}

      <section className="mt-10 md:mt-20">

        <h2 className="mb-5 md:mb-8 text-2xl md:text-4xl font-black text-blue-500">
          🤵 Choose Mr
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-8">

          {mrCandidates.map((candidate) => (

            <button
              key={candidate.id}
              type="button"
              onClick={() => setSelectedMr(candidate.id)}
              className={`overflow-hidden rounded-2xl md:rounded-3xl border transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                selectedMr === candidate.id
                  ? "border-blue-500 ring-2 md:ring-4 ring-blue-500"
                  : "border-zinc-700"
              }`}
            >

              <div className="relative h-[180px] sm:h-[220px] md:h-[340px]">

                <Image
                  src={candidate.image}
                  alt={candidate.name}
                  fill
                  sizes="
                    (max-width:640px) 50vw,
                    (max-width:768px) 50vw,
                    (max-width:1200px) 33vw,
                    25vw
                  "
                  className="object-cover"
                />

                {selectedMr === candidate.id && (

                  <div className="absolute right-2 top-2 rounded-full bg-blue-600 px-2 py-1 text-[10px] sm:text-xs md:text-base font-bold text-white">

                    ✓ Selected

                  </div>

                )}

              </div>

              <div className="bg-zinc-950 p-2 sm:p-3 md:p-6">

                <h3 className="text-xs sm:text-sm md:text-xl font-bold text-white leading-tight">

                  {candidate.name}

                </h3>

                <p className="mt-1 text-[11px] sm:text-xs md:text-base text-blue-400">

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