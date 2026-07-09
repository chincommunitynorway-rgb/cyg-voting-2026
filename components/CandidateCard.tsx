"use client";

import { useState } from "react";
import Link from "next/link";
import CandidateModal from "./CandidateModal";

type Props = {
  id: number;
  name: string;
  title: string;
  city: string;
  age: number;
  khua: string;
  hobbies: string[];
  image: string;
  caption?: string;
  type: "miss" | "mr";
};

export default function CandidateCard(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-red-600 sm:rounded-3xl">
        {/* IMAGE */}
        <div className="relative">
          <img
            src={props.image}
            alt={props.name}
            className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[320px] lg:h-[470px]"
          />

          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold text-white shadow-lg sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
            {props.title}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-3 sm:p-5 lg:p-6">
          <h2 className="text-base font-black leading-tight text-white sm:text-2xl lg:text-4xl">
            {props.name}
          </h2>

          <div className="mt-2 space-y-1 text-xs text-gray-300 sm:mt-4 sm:text-sm lg:text-base">
            <p>📍 {props.city}</p>
            <p>🎂 {props.age} years</p>
            <p>🏠 {props.khua}</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
            {props.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="rounded-full bg-red-600/20 px-2 py-1 text-[10px] text-red-300 sm:px-3 sm:text-xs lg:text-sm"
              >
                {hobby}
              </span>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-white py-2.5 text-xs font-semibold text-white transition hover:bg-white hover:text-black sm:py-3 sm:text-sm lg:text-base"
            >
              View Profile
            </button>

            <Link
              href={`/vote?type=${props.type}&id=${props.id}`}
              className="w-full rounded-xl bg-red-600 py-2.5 text-center text-xs font-bold text-white transition hover:bg-red-700 sm:py-3 sm:text-sm lg:text-base"
            >
              Vote ❤️
            </Link>
          </div>
        </div>
      </div>

      <CandidateModal
        open={open}
        onClose={() => setOpen(false)}
        candidate={props}
        type={props.type}
      />
    </>
  );
}