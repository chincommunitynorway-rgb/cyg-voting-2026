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
        <h2 className="mb-4 text-xl font-black text-red-500 sm:mb-5 sm:text-2xl md:mb-8 md:text-4xl">
          👑 Choose Miss
        </h2>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-3 md:gap-8 xl:grid-cols-4">
          {missCandidates.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              onClick={() => setSelectedMiss(candidate.id)}
              className={`overflow-hidden rounded-xl border transition duration-300 hover:-translate-y-2 hover:shadow-2xl md:rounded-3xl ${
                selectedMiss === candidate.id
                  ? "border-red-500 ring-2 ring-red-500 md:ring-4"
                  : "border-zinc-700"
              }`}
            >
              <div className="relative h-[145px] sm:h-[190px] md:h-[340px]">
                <Image
                  src={candidate.image}
                  alt={candidate.name}
                  fill
                  sizes="
                    (max-width:640px) 33vw,
                    (max-width:768px) 33vw,
                    (max-width:1200px) 33vw,
                    25vw
                  "
                  className="object-cover"
                />

                {selectedMiss === candidate.id && (
                  <div className="absolute right-1 top-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[8px] font-bold text-white sm:right-2 sm:top-2 sm:px-2 sm:py-1 sm:text-[10px] md:text-sm">
                    ✓
                  </div>
                )}
              </div>

              <div className="bg-zinc-950 p-2 sm:p-3 md:p-6">
                <h3 className="text-[10px] font-bold leading-tight text-white sm:text-xs md:text-xl">
                  {candidate.name}
                </h3>

                <p className="mt-1 text-[9px] text-red-400 sm:text-[10px] md:text-base">
                  {candidate.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* MR */}

      <section className="mt-10 md:mt-20">
        <h2 className="mb-4 text-xl font-black text-blue-500 sm:mb-5 sm:text-2xl md:mb-8 md:text-4xl">
          🤵 Choose Mr
        </h2>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-3 md:gap-8 xl:grid-cols-4">
          {mrCandidates.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              onClick={() => setSelectedMr(candidate.id)}
              className={`overflow-hidden rounded-xl border transition duration-300 hover:-translate-y-2 hover:shadow-2xl md:rounded-3xl ${
                selectedMr === candidate.id
                  ? "border-blue-500 ring-2 ring-blue-500 md:ring-4"
                  : "border-zinc-700"
              }`}
            >
              <div className="relative h-[145px] sm:h-[190px] md:h-[340px]">
                <Image
                  src={candidate.image}
                  alt={candidate.name}
                  fill
                  sizes="
                    (max-width:640px) 33vw,
                    (max-width:768px) 33vw,
                    (max-width:1200px) 33vw,
                    25vw
                  "
                  className="object-cover"
                />

                {selectedMr === candidate.id && (
                  <div className="absolute right-1 top-1 rounded-full bg-blue-600 px-1.5 py-0.5 text-[8px] font-bold text-white sm:right-2 sm:top-2 sm:px-2 sm:py-1 sm:text-[10px] md:text-sm">
                    ✓
                  </div>
                )}
              </div>

              <div className="bg-zinc-950 p-2 sm:p-3 md:p-6">
                <h3 className="text-[10px] font-bold leading-tight text-white sm:text-xs md:text-xl">
                  {candidate.name}
                </h3>

                <p className="mt-1 text-[9px] text-blue-400 sm:text-[10px] md:text-base">
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