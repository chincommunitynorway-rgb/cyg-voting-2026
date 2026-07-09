import Image from "next/image";
import Countdown from "./Countdown";
import Candidates from "./Candidates";

export default function Hero() {
  return (
    <>
      {/* HERO */}
      <section className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-12 text-center text-white sm:px-6 sm:py-20">
        {/* Logo */}
        <Image
          src="/images/smååå.png"
          alt="CYG Logo"
          width={120}
          height={120}
          className="mb-6 h-20 w-20 sm:mb-8 sm:h-[120px] sm:w-[120px]"
        />

        {/* Small Title */}
        <p className="text-xs font-semibold uppercase tracking-[4px] text-red-500 sm:text-sm sm:tracking-[10px]">
          OFFICIAL VOTING PLATFORM
        </p>

        {/* Main Title */}
        <h1 className="mt-5 text-4xl font-black sm:mt-6 sm:text-6xl md:text-8xl">
          CYG
        </h1>

        <h1 className="text-4xl font-black text-red-600 sm:text-6xl md:text-8xl">
          MISS & MR POPULAR
        </h1>

        <h1 className="text-4xl font-black sm:text-6xl md:text-8xl">
          2026
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-base leading-7 text-gray-300 sm:mt-10 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
          Welcome to the official voting platform for the{" "}
          <span className="font-bold text-red-500">
            CYG Miss & Mr Popular 2026
          </span>
          .
        </p>

        <p className="mt-3 text-sm text-gray-400 sm:text-base lg:text-lg">
          Support your favourite contestant by casting your vote.
        </p>

        {/* Voting Rules */}
        <div className="mt-10 w-full max-w-3xl rounded-2xl border border-red-600 bg-zinc-900 p-5 shadow-2xl sm:mt-12 sm:rounded-3xl sm:p-8">
          <h2 className="mb-5 text-2xl font-bold text-red-500 sm:mb-6 sm:text-3xl">
            📢 Voting Rules
          </h2>

          <div className="space-y-3 text-left text-sm text-gray-300 sm:space-y-4 sm:text-base lg:text-lg">
            <p>
              ✅ You may vote for <strong>ONE (1) Miss contestant</strong>.
            </p>

            <p>
              ✅ You may vote for <strong>ONE (1) Mr contestant</strong>.
            </p>

            <p>❌ Only one vote is allowed per category.</p>

            <p>
              ⚠️ Duplicate or fraudulent votes may be removed by the organisers.
            </p>
          </div>
        </div>

        {/* Button */}
        <a
          href="#contestants"
          className="mt-10 rounded-full bg-red-600 px-8 py-3 text-base font-bold text-white transition duration-300 hover:scale-105 hover:bg-red-700 sm:mt-12 sm:px-12 sm:py-5 sm:text-xl"
        >
          ❤️ Start Voting
        </a>

        {/* Countdown */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
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