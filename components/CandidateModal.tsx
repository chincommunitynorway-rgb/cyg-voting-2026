"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Candidate = {
  id: number;
  name: string;
  title: string;
  city: string;
  age: number;
  khua: string;
  hobbies: string[];
  image: string;
  caption?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  candidate: Candidate;
  type: "miss" | "mr";
};

export default function CandidateModal({
  open,
  onClose,
  candidate,
  type,
}: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm animate-fadeIn sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl sm:rounded-3xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-black transition hover:bg-red-600 hover:text-white sm:right-5 sm:top-5 sm:h-10 sm:w-10 sm:text-xl"
        >
          ✕
        </button>

        <div className="grid lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative h-[260px] sm:h-[350px] lg:h-[700px]">
            <Image
              src={candidate.image}
              alt={candidate.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CONTENT */}
          <div className="max-h-[60vh] overflow-y-auto p-5 sm:max-h-[700px] sm:p-8 lg:p-10">
            <span className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white sm:px-5 sm:py-2 sm:text-sm">
              {candidate.title}
            </span>

            <h1 className="mt-4 text-3xl font-black text-white sm:mt-6 sm:text-4xl lg:text-5xl">
              {candidate.name}
            </h1>

            <div className="mt-6 space-y-3 text-sm text-gray-300 sm:mt-8 sm:space-y-4 sm:text-base lg:text-lg">
              <p>
                📍 <span className="font-semibold">{candidate.city}</span>
              </p>

              <p>
                🎂 <span className="font-semibold">{candidate.age} years</span>
              </p>

              <p>
                🏠 <span className="font-semibold">{candidate.khua}</span>
              </p>
            </div>

            <div className="mt-8 sm:mt-10">
              <h2 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl">
                ❤️ Hobbies
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {candidate.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-300 sm:px-4 sm:py-2"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <h2 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl">
                📖 About
              </h2>

              <div className="rounded-xl bg-zinc-800 p-4 text-sm leading-7 text-gray-300 sm:rounded-2xl sm:p-6 sm:text-base sm:leading-8">
                {candidate.caption ??
                  "More information about this contestant will be available soon."}
              </div>
            </div>

            <Link href={`/vote?type=${type}&id=${candidate.id}`}>
              <button className="mt-8 w-full rounded-xl bg-red-600 py-3 text-base font-bold text-white transition hover:bg-red-700 sm:mt-10 sm:rounded-2xl sm:py-4 sm:text-lg lg:py-5 lg:text-xl">
                ❤️ Vote for {candidate.name}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}