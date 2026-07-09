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
      <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-red-600">

        {/* IMAGE */}
        <div className="relative">

          <img
            src={props.image}
            alt={props.name}
            className="h-[470px] w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
            {props.title}
          </span>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          <h2 className="text-4xl font-black text-white">
            {props.name}
          </h2>

          <div className="mt-5 space-y-2 text-gray-300">

            <p>📍 {props.city}</p>

            <p>🎂 {props.age} years</p>

            <p>🏠 {props.khua}</p>

          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {props.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-300"
              >
                {hobby}
              </span>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="mt-8 grid grid-cols-2 gap-3">

            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-white py-3 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              View Profile
            </button>

            <Link href={`/vote?type=${props.type}&id=${props.id}`}>
              <button className="w-full rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700">
                Vote ❤️
              </button>
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