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
    <main className="min-h-screen bg-black flex items-center justify-center">
      <form
        onSubmit={login}
        className="bg-zinc-900 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Admin Login
        </h1>

        <input
          className="w-full p-3 rounded mb-4 bg-zinc-800 text-white"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 rounded mb-4 bg-zinc-800 text-white"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <button
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded text-white font-bold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}