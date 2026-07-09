"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-8 sm:px-6">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded-2xl bg-zinc-900 p-5 shadow-xl sm:p-8"
      >
        <h1 className="mb-5 text-2xl font-bold text-white sm:mb-6 sm:text-3xl">
          Admin Login
        </h1>

        <input
          className="mb-4 w-full rounded-lg bg-zinc-800 p-3 text-sm text-white outline-none sm:rounded-xl sm:text-base"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded-lg bg-zinc-800 p-3 text-sm text-white outline-none sm:rounded-xl sm:text-base"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="mb-4 text-sm text-red-500 sm:text-base">
            {error}
          </p>
        )}

        <button
          className="w-full rounded-lg bg-red-600 p-3 text-base font-bold text-white transition hover:bg-red-700 sm:rounded-xl sm:text-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}