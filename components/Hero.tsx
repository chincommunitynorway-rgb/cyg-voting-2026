import Image from "next/image";
import Countdown from "./Countdown";
import Candidates from "./Candidates";

export default function Hero() {
  return (
    <>
      {/* HERO */}
      <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 text-center">

        {/* Logo */}
        <Image
          src="/images/smååå.png"
          alt="CYG Logo"
          width={120}
          height={120}
          className="mb-8"
        />

        {/* Small Title */}
        <p className="uppercase tracking-[10px] text-red-500 text-sm font-semibold">
          OFFICIAL VOTING PLATFORM
        </p>

        {/* Main Title */}
        <h1 className="mt-6 text-6xl md:text-8xl font-black">
          CYG
        </h1>

        <h1 className="text-6xl md:text-8xl font-black text-red-600">
          MISS & MR POPULAR
        </h1>

        <h1 className="text-6xl md:text-8xl font-black">
          2026
        </h1>

        {/* Description */}
        <p className="mt-10 max-w-3xl text-xl leading-9 text-gray-300">
          Welcome to the official voting platform for the{" "}
          <span className="font-bold text-red-500">
            CYG Miss & Mr Popular 2026
          </span>
          .
        </p>

        <p className="mt-3 text-lg text-gray-400">
          Support your favourite contestant by casting your vote.
        </p>

        {/* Voting Rules */}
        <div className="mt-12 max-w-3xl rounded-3xl border border-red-600 bg-zinc-900 p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-red-500 mb-6">
            📢 Voting Rules
          </h2>

          <div className="space-y-4 text-left text-lg text-gray-300">

            <p>
              ✅ You may vote for <strong>ONE (1) Miss contestant</strong>.
            </p>

            <p>
              ✅ You may vote for <strong>ONE (1) Mr contestant</strong>.
            </p>

            <p>
              ❌ Only one vote is allowed per category.
            </p>

            <p>
              ⚠️ Duplicate or fraudulent votes may be removed by the organisers.
            </p>

          </div>

        </div>

        {/* Button */}
        <a
          href="#contestants"
          className="mt-12 rounded-full bg-red-600 px-12 py-5 text-xl font-bold text-white transition duration-300 hover:bg-red-700 hover:scale-105"
        >
          ❤️ Start Voting
        </a>

        {/* Countdown */}
        <div className="mt-20">
          <Countdown />
        </div>

      </section>

      {/* Contestants */}
      <div id="contestants">
        <Candidates />
      </div>

    </>
  );
}