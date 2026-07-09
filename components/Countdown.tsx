"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  // Voting ends: 16 July 2026 at 21:00 (Norwegian summer time)
  const targetDate = new Date("2026-07-16T21:00:00+02:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
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
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full">
      <div className="mb-8 text-center sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[4px] text-red-400 sm:mb-3 sm:text-sm sm:tracking-[8px]">
          Voting closes in
        </p>

        <h2 className="text-2xl font-black text-white sm:text-4xl md:text-5xl">
          COUNTDOWN
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 md:gap-6">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-red-500/30 sm:rounded-3xl sm:p-6 lg:p-8"
          >
            <h2 className="text-3xl font-black text-red-500 sm:text-5xl md:text-6xl">
              {String(item.value).padStart(2, "0")}
            </h2>

            <p className="mt-2 text-xs font-semibold uppercase tracking-[2px] text-zinc-300 sm:mt-4 sm:text-sm sm:tracking-[4px]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}