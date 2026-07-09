"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-07-16T12:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) / 1000
        ),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full">

      <div className="text-center mb-10">

        <p className="uppercase tracking-[8px] text-red-400 text-sm mb-3 font-semibold">
          Voting closes in
        </p>

        <h2 className="text-4xl md:text-5xl font-black text-white">
          COUNTDOWN
        </h2>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-red-500/30"
          >
            <h2 className="text-5xl md:text-6xl font-black text-red-500">
              {String(item.value).padStart(2, "0")}
            </h2>

            <p className="mt-4 uppercase tracking-[4px] text-zinc-300 font-semibold">
              {item.label}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}