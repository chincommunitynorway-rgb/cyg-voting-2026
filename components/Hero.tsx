import Image from "next/image";
import Countdown from "./Countdown";
import Candidates from "./Candidates";
export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-black text-white px-6 text-center">
      <Image
  src="/images/smååå.png"
  alt="CYG Logo"
  width={120}
  height={120}
  className="mb-8"
/>
<p className="uppercase tracking-[8px] text-gray-400 text-sm mb-4">
  OFFICIAL VOTING PLATFORM
</p>
      <h1 className="text-5xl md:text-7xl font-extrabold text-red-600">
        CYG MISS & MR POPULAR 2026
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-gray-300">
        Welcome to the official voting page for CYG Miss & Mr Popular 2026.
        Support your favorite contestant by casting your vote.
      </p>

      <div className="mt-10">
        <button className="rounded-full bg-red-600 px-10 py-4 text-lg font-semibold transition hover:bg-red-700">
          Start Voting
        </button>
      </div>
      <Countdown />
      <Candidates />

    </section>
  );
}