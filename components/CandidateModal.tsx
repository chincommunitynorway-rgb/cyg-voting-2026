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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-700 shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-50 h-10 w-10 rounded-full bg-white text-black text-xl font-bold hover:bg-red-600 hover:text-white transition"
        >
          ✕
        </button>

        <div className="grid lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative h-[450px] lg:h-[700px]">
            <Image
              src={candidate.image}
              alt={candidate.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* CONTENT */}
          <div className="overflow-y-auto p-10 max-h-[700px]">

            <span className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold uppercase tracking-widest text-white">
              {candidate.title}
            </span>

            <h1 className="mt-6 text-5xl font-black text-white">
              {candidate.name}
            </h1>

            <div className="mt-8 space-y-4 text-lg text-gray-300">

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

            <div className="mt-10">

              <h2 className="mb-4 text-2xl font-bold text-white">
                ❤️ Hobbies
              </h2>

              <div className="flex flex-wrap gap-3">
                {candidate.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="rounded-full bg-red-600/20 px-4 py-2 text-red-300"
                  >
                    {hobby}
                  </span>
                ))}
              </div>

            </div>

            <div className="mt-10">

              <h2 className="mb-4 text-2xl font-bold text-white">
                📖 About
              </h2>

              <div className="rounded-2xl bg-zinc-800 p-6 text-gray-300 leading-8">
                {candidate.caption ??
                  "More information about this contestant will be available soon."}
              </div>

            </div>

            <Link href={`/vote?type=${type}&id=${candidate.id}`}>
              <button className="mt-10 w-full rounded-2xl bg-red-600 py-5 text-xl font-bold text-white transition hover:bg-red-700 hover:scale-[1.02]">
                ❤️ Vote for {candidate.name}
              </button>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}